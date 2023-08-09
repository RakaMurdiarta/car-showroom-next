"use client";
import React, { useState } from "react";
import { SearchManufacturer } from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface IotherClasses {
  otherClasses: string;
}

const SearchButton = ({ otherClasses }: IotherClasses) => {
  return (
    <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
      <Image
        src={"/magnifying-glass.svg"}
        alt="magnifying glass"
        className="object-contain"
        width={40}
        height={40}
      />
    </button>
  );
};

const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer === "" && model === "") {
      return alert("Please fill in the search bar");
    }

    updateSearchParams(manufacturer.toLowerCase(), model.toLowerCase());
  };

  const updateSearchParams = (manufacturer: string, model: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer);
    } else {
      searchParams.delete("manufacturer");
    }

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    console.log("ini search params", newPathname);
    router.push(newPathname, { scroll: false });
  };

  return (
    <form action="" className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <SearchButton otherClasses={"sm:hidden"} />
      </div>
      <div className="searchbar__item">
        <Image
          src={"/model-icon.png"}
          alt="car model"
          className="absolute w-[20px] h-[20px] ml-4"
          width={40}
          height={40}
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setModel(e.target.value)
          }
          placeholder="Tiguan"
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
