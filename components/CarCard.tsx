"use client";

import { CarsProps } from "@/types";
import React, { FC, useState } from "react";
import Custombutton from "./Custombutton";
import { calculateCarRent, generateCarImageUrl } from "@/utils";
import Image from "next/image";
import CarDetails from "./CarDetails";

export interface CarsCardProps {
  car: CarsProps;
}

const CarCard: FC<CarsCardProps> = ({ car }): JSX.Element => {

const [isOpen, setIsOpen] = useState<boolean>(false)
  const { city_mpg, year, make, model, transmission, drive } = car;

  const carRent = calculateCarRent(city_mpg, year);
  return (
    <div className="car-card group">
      <div className="car-car__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>
      <p className="flex mt-6 text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-semibold">$</span>
        {carRent}
        <span className="self-end text-[14px] font-medium">/day</span>
      </p>
      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={generateCarImageUrl(car)}
          alt="car model"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center gap-2 items-center">
            <Image
              src={"/steering-wheel.svg"}
              width={20}
              height={20}
              alt="streeing wheel"
            />
            <p className="text-[14px] ">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="flex flex-col justify-center gap-2 items-center">
            <Image
              src={"/tire.svg"}
              width={20}
              height={20}
              alt="streeing wheel"
            />
            <p className="text-[14px] ">{drive.toUpperCase()}</p>
          </div>
          <div className="flex flex-col justify-center gap-2 items-center">
            <Image
              src={"/gas.svg"}
              width={20}
              height={20}
              alt="streeing wheel"
            />
            <p className="text-[14px] ">{city_mpg} MPG</p>
          </div>

        </div>
        <div className="car-card__btn-container">
            <Custombutton title="View More" containerStyles="bg-primary-blue rounded-full w-full py-[16px]"
            textStyles = "text-white text-[14px] leading-[17px] font-bold"
            rightIcon='/right-arrow.svg'
            handleClick={()=> setIsOpen(true)}
            />
        </div>
      </div>
      <CarDetails isOpen={isOpen} closeModal={()=>{
        setIsOpen(false)
      }} car={car}/>
    </div>
  );
};

export default CarCard;
