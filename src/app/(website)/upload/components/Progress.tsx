import Image from "next/image";
import React, { useEffect, useState } from "react";
type Props = {
  file: any;
  removeFile: () => void;
};
const Progress = ({ file, removeFile }: Props) => {
  const [progressWidth, setProgressWidth] = useState(file.percent);

  useEffect(() => {
    setProgressWidth(file.percent);
  }, [file.percent]);

  const progressStyle = {
    width: `${progressWidth}%`,
  };
  const handleRemoveFile = () => {
    removeFile();
    setProgressWidth(0);
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
          <button onClick={handleRemoveFile}>
            <Image
              src="/assets/images/home/Remove.svg"
              width={20}
              height={20}
              alt="image"
            />
          </button>
        </div>
      </div>
      <div className="progrssarea">
        <div className="progress-bar">
          <div className="progrsspercentage" style={progressStyle}></div>
        </div>
        <p className="propercent">{file.percent}</p>
      </div>
    </>
  );
};

export default Progress;
