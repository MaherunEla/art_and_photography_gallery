import Image from "next/image";
import React from "react";
type Props = {
  file: any;
};
const Progress = ({ file }: Props) => {
  const progressStyle = {
    width: `${file.percent}%`,
  };
  return (
    <>
      <div className="progressfile">
        <div className="imagearea">
          <div className=" image">
            <Image src="/assets/images/home/File.svg" fill alt="image" />
          </div>
        </div>
        <div className="filenamearea">
          <div>
            <p className="filename">{file.FileName}</p>
            <p className="total">{file.total}</p>
          </div>
          <Image
            src="/assets/images/home/Remove.svg"
            width={20}
            height={20}
            alt="image"
          />
        </div>
      </div>
      <div className="progrssarea">
        <div className="progress-bar ">
          <div className="progrsspercentage" style={progressStyle}></div>
        </div>
        <p className="propercent">{file.percent}</p>
      </div>
    </>
  );
};

export default Progress;
