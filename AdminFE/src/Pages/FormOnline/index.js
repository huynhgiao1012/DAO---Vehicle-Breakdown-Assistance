import {
  Input,
  DatePicker,
  Row,
  Col,
  Table,
  Popconfirm,
  Button,
  Spin,
  Modal,
  Collapse,
  Alert,
  Tabs,
  notification,
} from "antd";
import React from "react";

import { useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import BreadcrumbComponent from "../../Component/Breadcrumb";

import "./style/form.css";
import { useTranslation, withTranslation } from "react-i18next";
const { Search } = Input;
const { Panel } = Collapse;

const FormsComponent = (props) => {
  // const {
  //   getAllForms,
  //   isLoading,
  //   forms,
  //   total,
  //   getDetailForms,
  //   detailForm,
  //   deleteForms,
  //   getProfile,
  // } = props;
  // const { i18n } = useTranslation();
  // const [data, setData] = useState();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [record, setRecord] = useState("");
  // const [payload, setPayload] = useState({
  //   search: "",
  //   paging: {
  //     pageIndex: 1,
  //     pageSize: 10,
  //   },
  //   sorting: {
  //     field: "createdAt",
  //     order: "desc",
  //   },
  //   type: 0,
  // });
  // useEffect(() => {
  //   const res = getProfile({ username: localStorage.getItem("username") });
  //   if (res.status === 200) {
  //     getAllForms(payload);
  //   }
  // }, []);
  // useEffect(() => {
  //   i18n.changeLanguage(localStorage.getItem("lang"));
  //   getAllForms(payload);
  // }, [payload]);
  // const columns = [
  //   {
  //     title: "Id",
  //     key: "id",
  //     render: (text, record, index) => {
  //       return (
  //         <div key={index}>
  //           {(payload.paging.pageIndex - 1) * 10 + index + 1}
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     title: i18n.t("Title"),
  //     dataIndex: "title",
  //     sorter: true,
  //     key: "title",
  //     render: (text, record) => (
  //       <button
  //         style={{ border: "none", color: "#1890ff", background: "none" }}
  //         onClick={() => showModal(record)}
  //       >
  //         {text}
  //       </button>
  //     ),
  //   },
  //   {
  //     title: i18n.t("formType"),
  //     dataIndex: "formType",
  //     sorter: true,
  //     key: "formType",
  //     render: (text, record) => (
  //       <>
  //         <div className="orange">{record.formType}</div>
  //       </>
  //     ),
  //   },
  //   {
  //     title: i18n.t("Status"),
  //     dataIndex: "status",
  //     sorter: true,
  //     key: "status",
  //     render: (text, record) => (
  //       <>
  //         {record.status === "APPROVED" ? (
  //           <div className="green">{i18n.t("approved")}</div>
  //         ) : (
  //           <div className="yellow">{i18n.t("rejected")}</div>
  //         )}
  //       </>
  //     ),
  //   },
  //   {
  //     title: i18n.t("createdBy"),
  //     dataIndex: "createdBy",
  //     sorter: true,
  //     key: "createdBy",
  //   },
  //   {
  //     title: i18n.t("createdAt"),
  //     dataIndex: "createdAt",
  //     sorter: true,
  //     key: "createdAt",
  //   },
  //   {
  //     title: i18n.t("action"),
  //     key: "action",
  //     render: (text, record) => (
  //       <Popconfirm
  //         title="Sure to delete?"
  //         onConfirm={() => onDelete(record.id)}
  //       >
  //         <a href="#">{i18n.t("delete")}</a>
  //       </Popconfirm>
  //     ),
  //   },
  // ];
  // const columns2 = [
  //   {
  //     title: "ID",
  //     dataIndex: "id",
  //   },
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //   },
  //   {
  //     title: "Quantity/Amount",
  //     dataIndex: "quantity",
  //   },
  //   {
  //     title: "Reason/Note",
  //     dataIndex: "reason",
  //   },
  // ];
  // const handleTableChange = (pagination, _, sorter) => {
  //   setData();
  //   setPayload({
  //     ...payload,
  //     paging: {
  //       pageIndex: pagination.current,
  //       pageSize: pagination.pageSize,
  //     },
  //     sorting: {
  //       field: sorter.field,
  //       order: sorter.order ? sorter.order.slice(0, -3) : "desc",
  //     },
  //   });
  // };
  // const showModal = async (record) => {
  //   setRecord(record);
  //   setIsModalOpen(true);
  //   await getDetailForms(record.id);
  //   console.log(detailForm);
  // };
  // const handleOk = async (id, value) => {
  //   const obj = {
  //     reply: value.feedbacks,
  //   };
  //   const res = await replyFeedbacks(id, obj);
  //   if (res === 200) {
  //     notification.open({
  //       message: "REPLY",
  //       description: "Reply success",
  //       icon: <DownOutlined style={{ color: "green" }} />,
  //     });
  //     getAllFeedbacks(payload);
  //   }
  //   setIsModalOpen(false);
  // };
  // const onChange = (key) => {
  //   console.log(key);
  // };
  // const handleTabChange = (key) => {
  //   setPayload({ ...payload, type: key });
  // };
  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };
  // const onDelete = async (id) => {
  //   const res = await deleteForms(id);
  //   if (res === 200) {
  //     notification.open({
  //       message: "DELETE",
  //       description: "Delete success",
  //       icon: <CheckOutlined style={{ color: "green" }} />,
  //     });
  //     getAllForms(payload);
  //   }
  // };
  // const onSearch = (value) => {
  //   setData();
  //   setPayload({ ...payload, search: value });
  // };
  // const handleFilter = (value) => {
  //   if (!value) {
  //     setData(forms);
  //   } else {
  //     const date1 = value[0].toDate().valueOf();
  //     const date2 = value[1].toDate().valueOf();
  //     console.log(date2);
  //     const filterArr = forms.filter((val) => {
  //       const dateStr = val.createdAt.slice(0, 10);
  //       const [day, month, year] = dateStr.split("/");
  //       const date3 = Date.parse(new Date(+year, month - 1, +day).toString());
  //       if (date3 >= date1 && date3 <= date2) {
  //         return val;
  //       }
  //     });
  //     setData(filterArr);
  //   }
  // };
  // return (
  //   <div className="formPage">
  //     <BreadcrumbComponent />
  //     <h4>{i18n.t("FormOnline")}</h4>
  //     <div className="search">
  //       <Row>
  //         <Col span={8}>
  //           <Search
  //             placeholder={i18n.t("searchTitle")}
  //             onSearch={onSearch}
  //             enterButton
  //             className="searchTitle"
  //           />
  //         </Col>
  //         <Col span={8}></Col>
  //         <Col span={8}>
  //           <Input.Group compact style={{ width: "100%" }}>
  //             <label style={{ marginRight: 5 }}>{i18n.t("filter")}:</label>
  //             <DatePicker.RangePicker
  //               style={{
  //                 width: "90%",
  //               }}
  //               onChange={handleFilter}
  //               placeholder={[i18n.t("startTime"), i18n.t("endTime")]}
  //             />
  //           </Input.Group>
  //         </Col>
  //       </Row>
  //     </div>
  //     <Tabs
  //       defaultActiveKey="1"
  //       onChange={handleTabChange}
  //       items={[
  //         {
  //           label: i18n.t("all"),
  //           key: 0,
  //           children: (
  //             <Spin tip="Loading..." spinning={isLoading}>
  //               <Table
  //                 style={{ marginTop: 10 }}
  //                 columns={columns}
  //                 dataSource={!data ? forms : data}
  //                 onChange={handleTableChange}
  //               />
  //             </Spin>
  //           ),
  //         },
  //         {
  //           label: i18n.t("workPermit"),
  //           key: 1,
  //           children: (
  //             <Spin tip="Loading..." spinning={isLoading}>
  //               <Table
  //                 style={{ marginTop: 10 }}
  //                 columns={columns}
  //                 dataSource={!data ? forms : data}
  //                 onChange={handleTableChange}
  //               />
  //             </Spin>
  //           ),
  //         },
  //         {
  //           label: i18n.t("moveIn"),
  //           key: 4,
  //           children: (
  //             <Spin tip="Loading..." spinning={isLoading}>
  //               <Table
  //                 style={{ marginTop: 10 }}
  //                 columns={columns}
  //                 dataSource={!data ? forms : data}
  //                 onChange={handleTableChange}
  //               />
  //             </Spin>
  //           ),
  //         },
  //         {
  //           label: i18n.t("moveOut"),
  //           key: 3,
  //           children: (
  //             <Spin tip="Loading..." spinning={isLoading}>
  //               <Table
  //                 style={{ marginTop: 10 }}
  //                 columns={columns}
  //                 dataSource={!data ? forms : data}
  //                 onChange={handleTableChange}
  //               />
  //             </Spin>
  //           ),
  //         },
  //         {
  //           label: i18n.t("workOrder"),
  //           key: 2,
  //           children: (
  //             <Spin tip="Loading..." spinning={isLoading}>
  //               <Table
  //                 style={{ marginTop: 10 }}
  //                 columns={columns}
  //                 dataSource={!data ? forms : data}
  //                 onChange={handleTableChange}
  //               />
  //             </Spin>
  //           ),
  //         },
  //       ]}
  //     />
  //     <Modal
  //       title={"EQUIPMENT/GOODS MOVING APPLICATION FORM - " + record.title}
  //       open={isModalOpen}
  //       footer={[]}
  //       onCancel={handleCancel}
  //       width={1000}
  //     >
  //       <Alert message="Informational Notes" type="info" showIcon />
  //       <Collapse defaultActiveKey={["1"]} onChange={onChange}>
  //         <Panel header="Personal Information" key="1">
  //           <p>Name of Owner(s):</p>
  //           <p>Apartment No. / Working area:{detailForm.apartmentNo}</p>
  //           <p>Mobile No:{detailForm.phoneNumber}</p>
  //           <p>Email:{detailForm.email}</p>
  //           <p>
  //             Form Created by: <strong>{detailForm.createdBy}</strong>
  //           </p>
  //           <p>
  //             Form Created at: <strong>{detailForm.createdAt}</strong>
  //           </p>
  //         </Panel>
  //         <Panel header="Moving Company Information" key="2">
  //           <p>Movie Company:</p>
  //           <p>Address:</p>
  //         </Panel>
  //         <Panel header="Supervisor Information" key="3">
  //           <p>Contact Person:{detailForm.supervisorName}</p>
  //           <p>Mobile No:{detailForm.supervisorPhone}</p>
  //         </Panel>
  //         <Panel header="Estimated Time" key="4">
  //           <p>From:</p>
  //           <p>To:</p>
  //         </Panel>
  //         <Panel header="Properties" key="5">
  //           <Table columns={columns2} dataSource={[]} size="middle" />
  //         </Panel>
  //       </Collapse>
  //     </Modal>
  //   </div>
  // );
};

export default FormsComponent;
