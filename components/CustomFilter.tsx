"use client";

import { CustomFilterProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { updateSearchParams } from "@/utils";

const CustomFilter: FC<CustomFilterProps> = ({ title, options }) => {
  const router = useRouter();
  const [selected, setselected] = useState(options[0]);

  const handleUpdateParams = (e: { title: string; value: string }) => {
    const newPathName = updateSearchParams(title, e.value.toLowerCase());
    router.push(newPathName, { scroll: false });
  };

  return (
    <div className="w-fit">
      <Listbox
        value={selected}
        onChange={(e) => {
          setselected(e);
          handleUpdateParams(e);
        }}
      >
        <div className="relative z-10 w-fit">
          <Listbox.Button className={"custom-filter__btn"}>
            <span className="block truncate">{selected.title}</span>
            <Image
              src={"/chevron-up-down.svg"}
              width={20}
              height={20}
              className="object-contain"
              alt="chevron up down"
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className={"custom-filter__options"}>
              {options.map((option) => (
                <Listbox.Option
                  value={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                  key={option.title}
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.title}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomFilter;
