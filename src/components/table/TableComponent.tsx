/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
import { Dispatch, useCallback, useEffect, useMemo, useState } from "react";
import moment, { Moment } from "moment/moment";
import { IconType } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
import { useDebouncedState, useMediaQuery } from "@mantine/hooks";
import { Table, TextInput, NumberInput, Loader } from "@mantine/core";
import { IoSearch } from "react-icons/io5";

import DateRangePickerComponent from "./DateRangePickerComponent";
import useQuery from "@/hooks/useQuery";
// import useDisableUI from "@/hooks/useDisableUI";
import MyButton from "../buttons/MyButton";
import MyPagination from "../common/MyPagination";

interface PropsType {
  rows: JSX.Element[];
  Icon?: IconType;
  title?: string;
  tableHeads: string[];
  addNewRoute?: string;
  addNewLabel?: string;
  search?: boolean;
  limit?: boolean;
  limitOnly?: boolean;
  dateRangePicker?: boolean;
  checkboxCol?: boolean;
  disableShadow?: boolean;
  actions?: boolean;
  titleSection?: boolean;
  pagination?: boolean;
  baseUrl?: string;
  filter?: string;
  setData?: Dispatch<any>;
  hideRoles?: string[];
  excelData?: any[];
  disableTablePadding?: boolean;
}

const TableComponent = ({
  title,
  tableHeads,
  rows,
  Icon,
  addNewRoute,
  addNewLabel = "Create New",
  search = true,
  limit = true,
  limitOnly = true,
  dateRangePicker = false,
  checkboxCol = true,
  disableShadow,
  actions = true,
  titleSection = true,
  pagination = true,
  disableTablePadding = false,
  baseUrl,
  filter = "",
  setData,
}: // hideRoles = [""],
PropsType) => {
  const [page, setPage] = useState<number>(1);
  const [dataLimit, setDataLimit] = useDebouncedState<number>(20, 500);
  const [dataSearch, setDataSearch] = useDebouncedState<string>("", 500);
  const [dateRange, setDateRange] = useState<{ start: Moment; end: Moment }>({
    start: moment()
      .subtract(moment().year() - 2000, "year")
      .startOf("year"),
    end: moment(),
  });
  // const check = useDisableUI();

  const url = useMemo(
    () =>
      `/${baseUrl}?page=${page}&limit=${dataLimit}${
        dataSearch ? `&search=${dataSearch}` : ""
      }${
        dateRangePicker
          ? `&start_date=${dateRange.start.format(
              "YYYY-MM-DD"
            )}&end_date=${dateRange.end.format("YYYY-MM-DD")}`
          : ""
      }${filter}`,
    [page, dataLimit, dataSearch, dateRange, filter, baseUrl]
  );

  const { isLoading, total } = useQuery(url, setData, baseUrl === undefined);

  const resetPage = useCallback(
    () => setPage(1),
    [dataLimit, dataSearch, dateRange, filter]
  );

  useEffect(() => resetPage(), [resetPage]);

  const matches = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();

  const heads = useMemo(
    () =>
      tableHeads?.map((head, index) => (
        <th key={index} className="m_th">
          {head}
        </th>
      )),
    [tableHeads]
  );

  return (
    <div
      className={` max-w-full rounded-[5px] bg-white ${
        !disableShadow && "shadow-md border "
      }`}
    >
      {titleSection && (
        <div className="sm:p-5 p-3 py-3 border-b border-black border-opacity-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="sm:text-[22px] text-[20px]" />}
            <p className="font-medium sm:text-lg text-base">{title} </p>
          </div>

          {addNewRoute && (
            <MyButton
              onClick={() => navigate(addNewRoute)}
              className="!w-[140px] sm:text-base text-sm"
            >
              {addNewLabel}
            </MyButton>
          )}
        </div>
      )}

      <div className={`${!disableTablePadding && "sm:p-4 p-3"}`}>
        {(search || limit) && (
          <div
            className="w-full flex lg:justify-between lg:items-center items-end lg:mb-4 mb-2 lg:flex-row 
      flex-col-reverse gap-2"
          >
            {search ? (
              <TextInput
                placeholder={"Search here..."}
                classNames={{
                  input: "h-[44px] w-full",
                  root: "sm:w-[350px] w-full",
                }}
                defaultValue={dataSearch}
                onChange={(e) => setDataSearch(e.target.value)}
                icon={<IoSearch className="text-xl" />}
              />
            ) : (
              <div></div>
            )}

            {limit && (
              <div className="flex  sm:items-center items-end  gap-3 sm:flex-row flex-col-reverse sm:w-auto w-full sm:justify-center justify-between">
                {dateRangePicker && (
                  <DateRangePickerComponent
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                  />
                )}
                <div className="flex items-center gap-6 ">
                  {limitOnly && (
                    <NumberInput
                      defaultValue={dataLimit}
                      onChange={(e) => setDataLimit(parseInt(e as string))}
                      min={0}
                      max={100}
                      classNames={{
                        wrapper: "w-[80px] h-full",
                        input: "text-base h-[44px]",
                      }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="w-full overflow-x-auto rounded-[5px]">
          <Table striped highlightOnHover withBorder>
            <thead>
              <tr className="!bg-primary-500  !h-[50px]">
                {checkboxCol && <th className="!w-[50px]"></th>}

                <th className="!w-[80px] font-[500] px-2 text-start">No</th>

                {heads}

                {actions && <th className="m_th">Actions</th>}
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={heads.length + 5}>
                    <div className="w-full h-[40px] flex justify-center items-center gap-2">
                      <Loader size="xs" /> <p>Loading ...</p>
                    </div>
                  </td>
                </tr>
              ) : (
                (rows?.length === 0 || (!isLoading && !rows)) && (
                  <tr>
                    <td colSpan={heads.length + 5}>
                      <div className="w-full h-[40px] flex justify-center items-center gap-2">
                        <p>No Records</p>
                      </div>
                    </td>
                  </tr>
                )
              )}

              {!isLoading && rows}
            </tbody>
          </Table>
        </div>

        {pagination && (
          <div className="w-full flex justify-end sm:mt-4 mt-2">
            <MyPagination
              value={page}
              onChange={(e) => setPage(e)}
              total={total || 10}
              siblings={1}
              size={matches ? "md" : "sm"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
