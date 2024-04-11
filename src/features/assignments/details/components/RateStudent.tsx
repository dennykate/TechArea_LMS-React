import MyButton from "@/components/buttons/MyButton";
import NumberInputComponent from "@/components/inputs/NumberInputComponent";
import React from "react";

const RateStudent = () => {
  return (
    <div className="space-y-4">
      <NumberInputComponent placeholder="Rate" label="Rate" />

      <div className="flex justify-end">
        <MyButton>Rate Now</MyButton>
      </div>
    </div>
  );
};

export default RateStudent;
