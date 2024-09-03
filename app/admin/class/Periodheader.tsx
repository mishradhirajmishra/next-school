"use client"
import { FC} from "react"
import {PeriodType,BasicData } from "../../components/shared/model/classhelper"
import DoubleArrowRightIcon from "@/app/components/shared/Icons/doubleArrowRight"
import Breadcrumb from "@/app/components/shared/utils/breadcrumb";

interface PeriodheaderProp {
  options: Array<string>
  formValuesPeriod:any,
  allTimeoption: any;
}


const Periodheader: FC<PeriodheaderProp> = ({options,  allTimeoption,formValuesPeriod }) => {
  return (
    <div className="flex justify-between ">
    <Breadcrumb options={options} />
    <span className="c-text-success mt-3">(
      {allTimeoption.find((x: any) => x.value == formValuesPeriod.start_time)?.name}-
      {allTimeoption.find((x: any) => x.value == formValuesPeriod.end_time)?.name} )</span>
  </div>)
}

export default Periodheader