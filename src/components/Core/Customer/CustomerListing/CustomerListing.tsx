"use client";
import {
  AppButton,
  AppSwitch,
  AppTable,
  DeleteModal,
  FilterInput,
  SearchInput,
} from "@/components/Common";
import { customerVerificationStatus, userStatus } from "@/constants";
import { useCustomerListing, usePageBreadcrumbs } from "@/hooks";
import { CustomerRow } from "@/types";
import { formatDateTime } from "@/utils";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Grid } from "antd";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo } from "react";

const { useBreakpoint } = Grid;

const renderValue = (value: unknown) => value || "--";
const renderDate = (value?: string) => (value ? formatDateTime(value) : "--");

interface CustomerListingProps {
  title: string;
  breadcrumbs?: string[];
}

export const CustomerListing: FC<CustomerListingProps> = ({
  title,
  breadcrumbs,
}) => {
  const router = useRouter();
  const screens = useBreakpoint();
  usePageBreadcrumbs(title, breadcrumbs);
  const {
    data,
    isLoading,
    isDeleting,
    pagination,
    searchValue,
    verificationFilter,
    statusFilter,
    handleFilterChange,
    handleTableChange,
    handleDelete,
    handleToggle,
  } = useCustomerListing();

  const handleSearch = useCallback(
    (value: string) => {
      handleFilterChange?.("search", value);
    },
    [handleFilterChange],
  );

  const openDeleteModal = useCallback(
    ({ id, firstName }: CustomerRow) => {
      DeleteModal({
        title: "Customer",
        entityName: firstName,
        onDelete: () => handleDelete(id),
      });
    },
    [handleDelete],
  );

  const renderActive = useCallback(
    (val: boolean, row: CustomerRow) => (
      <AppSwitch
        checked={val}
        onChange={(checked) => handleToggle(row.id, checked)}
      />
    ),
    [handleToggle],
  );

  const renderActions = useCallback(
    (_: unknown, row: CustomerRow) => (
      <div className="flex items-center justify-center">
        <EditOutlined
          onClick={() => router.push(`/customers/${row.id}`)}
          className="cursor-pointer text-blue-500! hover:bg-blue-50! hover:text-blue-600! p-2 rounded-full text-lg md:text-xl transition-all"
        />
        <DeleteOutlined
          disabled={isDeleting}
          onClick={() => openDeleteModal(row)}
          className="cursor-pointer text-red-500! hover:bg-red-50! hover:text-red-600! p-2 rounded-full text-lg md:text-xl transition-all"
        />
      </div>
    ),
    [router, isDeleting, openDeleteModal],
  );

  const columns = useMemo<ColumnsType<CustomerRow>>(
    () => [
      {
        title: "Code",
        dataIndex: "customerCode",
        key: "customerCode",
        fixed: screens.md ? "left" : undefined,
        width: 180,
        render: renderValue,
      },
      {
        title: "Name",
        dataIndex: "fullName",
        key: "fullName",
        width: 180,
        render: renderValue,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        responsive: ["md"],
        width: 250,
        render: renderValue,
      },
      {
        title: "Mobile Number",
        dataIndex: "phone",
        key: "phone",
        width: 180,
        render: renderValue,
      },
      {
        title: "Created By",
        dataIndex: "created_by",
        key: "created_by",
        width: 180,
        render: renderDate,
      },
      {
        title: "Created Date",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 180,
        render: renderDate,
      },
      {
        title: "Active",
        dataIndex: "isActive",
        key: "isActive",
        width: 180,
        render: renderActive,
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        align: "center",
        fixed: "right",
        width: screens.md ? 100 : 60,
        render: renderActions,
      },
    ],
    [renderActive, renderActions],
  );

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <h2 className="text-lg md:text-xl font-semibold">Customer Listing</h2>
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 w-full xl:w-auto">
            <div className="w-full sm:flex-1 lg:w-80">
              <SearchInput
                prefixIcon={<SearchOutlined />}
                value={searchValue}
                className="w-full h-10!"
                onSearch={handleSearch}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full sm:w-40 md:w-35 lg:w-40">
                  <FilterInput
                    placeholder="Verification Status"
                    filterKey="verification"
                    value={verificationFilter}
                    options={customerVerificationStatus}
                    className="w-full h-10!"
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="w-full sm:w-40 md:w-35 lg:w-40">
                  <FilterInput
                    placeholder="Status"
                    filterKey="status"
                    value={statusFilter}
                    options={userStatus}
                    className="w-full h-10!"
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
              <div className="w-full sm:w-auto sm:ml-auto">
                <AppButton
                  icon={<PlusOutlined />}
                  label="New Customer"
                  className="w-full sm:w-auto h-10! px-4 shrink-0 whitespace-nowrap"
                  onClick={() => router.push("/customers/add-customer")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppTable
        rowKey={(record: any) => record.id}
        tableColumns={columns}
        tableData={data}
        pagination={pagination}
        onChange={handleTableChange}
        loading={isLoading}
      />
    </>
  );
};

//  {
//                 "id": 4,
//                 "createdBy": 12,
//                 "customerCode": "CUST-4710EB81",
//                 "firstName": "Tilak1",
//                 "lastName": "Varma",
//                 "email": "tilak3@yopmail.com",
//                 "phone": "9853321116",
//                 "gender": "male",
//                 "address": "101, Empire Business Hub",
//                 "city": "Mumbai",
//                 "state": "Maharashtra",
//                 "pincode": "402440",
//                 "profileImage": "/uploads/profile/1782209156543-7d0a7517-12ad-4bc4-9a42-dc4401aab8bf.png",
//                 "isActive": true,
//                 "createdAt": "2026-06-23T10:05:56.000Z",
//                 "updatedAt": "2026-06-23T10:05:56.000Z",
//                 "deletedAt": null,
//                 "customer_documents": {
//                     "id": 6,
//                     "customerId": 4,
//                     "aadhaarNumber": "986532653265",
//                     "panNumber": "ABCDE1234F",
//                     "aadhaarFile": "/uploads/aadhaarCard/1782209156544-FR_PJ_AV.jpg",
//                     "panFile": "/uploads/panCard/1782209156544-Rectangle_42.png",
//                     "verificationStatus": "verified",
//                     "remarks": "remarks"
//                 },
//                 "created_by": {
//                     "id": 12,
//                     "roleId": 2,
//                     "fullName": "Virat Kohli"
//                 }
//             },
