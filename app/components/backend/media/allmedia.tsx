"use client"
import Image from 'next/image';
import { FC, useEffect, useState } from 'react'
import UploadIcon from '../../shared/Icons/upload';
import { FileType, Fileinit, MediaType, Mediainit } from '../../shared/model/mediahelper';
import { ImageSizeInMB, ImageSorce, getImageSize } from '../../shared/utils/helperfunction';
import TextField from '../../shared/forms-elements/textfield-html';
import { CreateUpdateMediaApi, GetSpecificMediaApi, ImageUploadApi } from '../../shared/utils/apis';
import Swall from '../../shared/utils/swal';
import { Delwarn } from '../../shared/utils/delwarn';
import TabBar from '../../shared/tabs/tabbar';
import Tabcontainer from '../../shared/tabs/tabcontainer';
import LeftArrowIcon from '../../shared/Icons/leftarrow';
import IMGR from '../../shared/images/imgr';
import IMG from '../../shared/images/img';
import IMGRBLOB from '../../shared/images/imgrblob';
const imageInit = Mediainit;
const fileInit = Fileinit;

interface Media {
  mediaData:MediaType,
  getSelectedMedia: (option: MediaType) => void
}

const Allmedia: FC<Media> = ({ getSelectedMedia,mediaData }) => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [file, setFile] = useState<FileType>(fileInit);
  const [media, setMedia] = useState<MediaType>(imageInit);
  const [selectedMedia, setSelectedMedia] = useState<MediaType>(imageInit);
  const [allmedia, setAllMedia] = useState<Array<MediaType>>([imageInit]);
  const [showUpdateAltBtn, setshowUpdateAltBtn] = useState<Boolean>(false);
  const [deleteData, seDeleteData] = useState({ showDelwarn: 0, _id: "" })
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => { setMedia(mediaData); getSpecificMedia()  }, [mediaData])

  const getSpecificMedia = async () => {
    if(mediaData.related_student_id!=""){
      const data = await GetSpecificMediaApi({related_student_id:mediaData.related_student_id,type:mediaData.type})
      setAllMedia(data.data.reverse());
    }else
    if(mediaData.related_employee_id!=""){
      const data = await GetSpecificMediaApi({related_employee_id:mediaData.related_employee_id,type:mediaData.type})
      setAllMedia(data.data.reverse());
    }
   
   
  }


  const uploadToClient = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0]
      const image = await getImageSize(file)
      const file_name = "profile_image_" + new Date().getTime() + "." + file.name.substr(file.name.lastIndexOf('.') + 1);
      const tempfile: any =  URL.createObjectURL(file)
      console.log(tempfile)
      setFile({
        ...file, url: tempfile, file: file,
        file_name: file_name,
      });

      setMedia({
        ...media, file_size: file.size,
        file_name: file_name,
        height: image.height, width: image.width
      });
    }
  };

  const uploadToServer = async () => {
    if (file.file) {
      const formData = new FormData()
      formData.set('file', file.file, file.file_name)
      let data = await ImageUploadApi(formData)
      if (data.class == "success") {
        const newData = await CreateUpdateMediaApi(media)
        seAlertData({ showSwall: Math.random(), className: newData.class, message: newData.msg })
        getSpecificMedia()
        setActiveTab(0)
        setFile(fileInit)
        setMedia(imageInit)
      } else {
        seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
      }
      console.log(data)
    } else {

    }
  }
  const delMedia = (val: any) => { }


  const updateMedia = async (media: MediaType) => {
    let data = await CreateUpdateMediaApi(selectedMedia)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    getSpecificMedia()
    setshowUpdateAltBtn(false)
   }
  return (
    <>
      <Swall swallData={alertData} />
      <Delwarn deleteData={deleteData} handeleDealate={(val) => { delMedia(val) }} />
      <TabBar tabs={["All Media", "Upload"]}  onOptionClick={(val) => { setActiveTab(val) }} selectedIndex={activeTab}/>
      <Tabcontainer className="mx-0  h-[calc(100vh-200px)]" show={activeTab == 0} >
        {selectedMedia._id=="" ?
        <div className="grid grid-cols-12 gap-x-2 h-full">
          <div className="col-span-12 h-full shadow-sm c-border-light  overflow-y-scroll">
            <div className="grid grid-cols-6 gap-4 p-4 ">
              {allmedia && allmedia.length > 0 && allmedia.map((media) =>
                <div key={media._id} className='h-48 c-border-light relative'>
                  <IMGR src={media.file_name}  onClick={() => { setSelectedMedia(media) }}/>
                </div>
              )}
            </div>
          </div>
        </div>
        :
        <div className="grid grid-cols-12 gap-x-2 h-full">
        <div className="col-span-8 shadow-sm c-border-light">
          <div className='flex  justify-center items-center  relative h-full w-auto'>
          <IMGR className='circle-image' src={selectedMedia.file_name} />
          </div>
        </div>
        <div className="col-span-4 shadow-sm c-border-light p-5">
       
          {selectedMedia.file_name && 
          <div className="flex flex-col h-full justify-between">
            <div> 
            {selectedMedia.file_name ? <><label className=" c-form-label ">File Name</label> <div className=" c-text-dark  c-input h-10  col-span-1 truncate ">{selectedMedia.file_name} </div></> : <></>}

            {selectedMedia.file_size && <> <label className=" c-form-label mt-5">File Size</label> <div className=" c-text-dark  c-input h-10  col-span-1 ">{ImageSizeInMB(selectedMedia.file_size)} MB</div></>}

            {selectedMedia.height && <> <label className=" c-form-label mt-5">Image Height</label> <div className=" c-text-dark  c-input h-10  col-span-1">{selectedMedia.height} Px</div></>}

            {selectedMedia.width && <>  <label className=" c-form-label mt-5">Image Width</label><div className="c-text-dark  c-input h-10  col-span-1">{selectedMedia.width} Px</div></>}
            <label className=" c-form-label mt-5">ALT Text For Image</label>
              <TextField value={selectedMedia.description} label="" name="description" onChange={(e: any) => {                
                 setSelectedMedia({...selectedMedia,description:e.target.value})
                 setshowUpdateAltBtn(true)
              }} />  </div>
             <div className='grid grid-cols-2  gap-4'>
              {showUpdateAltBtn && 
            <button disabled={selectedMedia.file_name == ""}  onClick={() => { updateMedia(media) }} className="btn-outline-success col-span-2    mt-5">Update Alt Text</button>
          }
            <button disabled={selectedMedia.file_name == ""}  onClick={() => { setSelectedMedia(media) }} className="btn-outline-dark    mt-5"><LeftArrowIcon/> Back</button>
            <button disabled={selectedMedia.file_name == ""} onClick={() => {
               getSelectedMedia(selectedMedia) 
               setSelectedMedia(imageInit)                
               }} className="btn-outline-success    mt-5">Use this Image</button>
           </div>  
        </div>
          }

        </div>
      </div>
}
      </Tabcontainer>
      <Tabcontainer className="mx-0  h-[calc(100vh-200px)]" show={activeTab == 1} >
        <div className="grid grid-cols-12 gap-x-2 h-full">
          <div className="col-span-8 shadow-sm c-border-light">
            <div className='flex  justify-center items-center  relative h-full w-auto'>          
              <label htmlFor='image'>
                {file.url ? <IMGRBLOB className='circle-image' src={file.url} /> : <UploadIcon />}
              </label>
              <input
                className='hidden'
                id='image'
                type="file"
                name="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => uploadToClient(e)}
              />
            </div>
          </div>
          <div className="col-span-4 shadow-sm c-border-light p-5">
            {media.file_name &&
                      <div className="flex flex-col h-full justify-between">
                      <div> 
              {media.file_name ? <><label className=" c-form-label ">File Name</label> <div className=" c-text-dark  c-input h-10  col-span-1 truncate ">{media.file_name} </div></> : <></>}

              {media.file_size && <> <label className=" c-form-label mt-5">File Size</label> <div className=" c-text-dark  c-input h-10  col-span-1 ">{ImageSizeInMB(media.file_size)} MB</div></>}

              {media.height && <> <label className=" c-form-label mt-5">Image Height</label> <div className=" c-text-dark  c-input h-10  col-span-1">{media.height} Px</div></>}

              {media.width && <>  <label className=" c-form-label mt-5">Image Width</label><div className="c-text-dark  c-input h-10  col-span-1">{media.width} Px</div></>}
              <label className=" c-form-label mt-5">ALT Text For Image</label>
              <TextField value={media.description} label="" name="description" onChange={(e: any) => {
                setMedia({ ...media, description: e.target.value })
              }} />
              </div>
              <div>
              <button disabled={media.file_name == ""} onClick={() => { uploadToServer() }} className="btn-outline-success w-full mt-5">Upload</button>
            
            </div>
            </div>
            }

          </div>
        </div>
      </Tabcontainer>

    </>
  )
}

export default Allmedia;