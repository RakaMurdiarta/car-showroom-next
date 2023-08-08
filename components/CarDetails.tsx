"use client";
import { CarsProps } from "@/types";
import React, { FC } from "react";
import { Fragment } from "react";
import Image from "next/image";

import { Dialog, Transition } from "@headlessui/react";
import { generateCarImageUrl } from "@/utils";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarsProps;
}
const CarDetails: FC<CarDetailsProps> = ({ car, closeModal, isOpen }) => {
  console.log(generateCarImageUrl(car,"33"))
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={
                    "w-full relative max-w-lg max-h-[90vh] overflow-y-auto transform bg-white rounded-2xl p-6 shadow-xl text-left transition-all flex flex-col gap-5"
                  }
                >
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                  >
                    <Image
                      src={"/close.svg"}
                      alt="close"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </button>
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg">
                      <Image
                        src={generateCarImageUrl(car)}
                        alt="car model"
                        fill
                        priority
                        className="object-contain"
                      />
                    </div>

                    <div className="flex gap-3 justify-center items-center">
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg flex justify-center items-center">
                        <Image
                          src={generateCarImageUrl(car,'29')}
                          alt="car model"
                          fill
                          priority
                          className="object-contain mt-1"
                        />
                      </div>
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg flex justify-center items-center">
                        <Image
                          src={generateCarImageUrl(car,"33")}
                          alt="car model"
                          fill
                          priority
                          className="object-contain mt-4"
                        />
                      </div>
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                        <Image
                          src={generateCarImageUrl(car, "13")}
                          alt="car model"
                          fill
                          priority
                          className="object-contain mt-1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <h2 className="capitalize font-semibold text-xl">
                      {car.make} {car.model}
                    </h2>

                    <div className="mt-3 flex flex-wrap gap-4">
                      {Object.entries(car).map(([key, value]) => (
                        <div
                          className="flex-between gap-5 w-full text-rigth"
                          key={key}
                        >
                          <h4 className="text-gray capitalize">
                            {key.split("_").join(" ")}
                          </h4>
                          <p className="font-semibold text-black-100">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CarDetails;
