import { CopyButton, Tooltip } from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";

import { twMerge } from "tailwind-merge";

interface PropsType {
  label: string;
  value: string;
}

const ImportantInformation: React.FC<PropsType> = ({ label, value }) => {
  return (
    <div className="flex items-center gap-4">
      <p className="sm:text-base text-sm font-[300]">{label}</p>

      <div className="px-6 py-2 border border-primary-500 rounded-full bg-primary-100 flex items-center gap-4">
        <p className="text-black font-[400] text-sm">{value}</p>

        <CopyButton value={value} timeout={2000}>
          {({ copied, copy }) => (
            <Tooltip
              label={copied ? "Copied" : "Copy"}
              withArrow
              position="right"
            >
              <div className="relative w-[35px] h-[35px] ">
                <button
                  onClick={copy}
                  className={twMerge(
                    "bg-white w-full h-full flex justify-center items-center rounded-full z-[10] absolute ",
                    copied
                      ? "top-0 left-0"
                      : "top-[-2px] left-[-2px] hover:top-0 hover:left-0"
                  )}
                >
                  {copied ? (
                    <IconCheck size="1rem" />
                  ) : (
                    <IconCopy size="1rem" />
                  )}
                </button>
                <div className="absolute top-0 left-0 z-1 bg-black w-full h-full rounded-full " />
              </div>
            </Tooltip>
          )}
        </CopyButton>
      </div>
    </div>
  );
};

export default ImportantInformation;
