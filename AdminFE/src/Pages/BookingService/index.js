import {
  Input,
  DatePicker,
  Row,
  Col,
  Table,
  Spin,
  notification,
  Drawer,
} from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import React from "react";

import { useEffect, useState } from "react";
import BreadcrumbComponent from "../../Component/Breadcrumb";

import "./style/booking.css";
import { useTranslation, withTranslation } from "react-i18next";
const { Search, TextArea } = Input;

const BookingServiceComponent = (props) => {
  // const {
  //   getAllServices,
  //   isLoading,
  //   services,
  //   total,
  //   detailService,
  //   getDetailServices,
  //   rejectServices,
  //   approveServices,
  //   getProfile,
  // } = props;
  // const { i18n } = useTranslation();
  // const [data, setData] = useState();
  // const [open, setOpen] = useState(false);
  // const [detail, setDetail] = useState(detailService);
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
  // });
  // useEffect(() => {
  //   const res = getProfile({ username: localStorage.getItem("username") });
  //   if (res.status === 200) {
  //     setDetail({ ...detail, ...detailService });
  //   }
  // }, []);
  // useEffect(() => {
  //   i18n.changeLanguage(localStorage.getItem("lang"));
  //   getAllServices(payload);
  // }, [payload]);
  // const columns = [
  //   {
  //     title: "Id",
  //     key: "id",
  //     render: (text, record, index) => {
  //       return (
  //         <div key={index}>
  //           {index + 10 * (payload.paging.pageIndex - 1) + 1}
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     title: i18n.t("serviceName"),
  //     dataIndex: "serviceName",
  //     sorter: true,
  //     key: "serviceName",
  //     render: (text, record) => (
  //       <button
  //         style={{ border: "none", color: "#1890ff", background: "none" }}
  //         onClick={() => showDrawer(record.id)}
  //       >
  //         {text}
  //       </button>
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
  //           <div className="greenTag">{i18n.t("approved")}</div>
  //         ) : (
  //           <div className="red">{i18n.t("rejected")}</div>
  //         )}
  //       </>
  //     ),
  //     width: 300,
  //     align: "center",
  //   },
  //   {
  //     title: i18n.t("createdBy"),
  //     dataIndex: "createdBy",
  //     sorter: true,
  //     key: "createdBy",
  //   },
  //   {
  //     title: i18n.t("bookingDate"),
  //     dataIndex: "chooseDate",
  //     sorter: true,
  //     key: "chooseDate",
  //   },
  //   {
  //     title: i18n.t("bookingTime"),
  //     dataIndex: "bookingTime",
  //     sorter: true,
  //     key: "bookingTime",
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
  // const showDrawer = async (id) => {
  //   const res = await getDetailServices(id);
  //   if (res.status !== 500) {
  //     setDetail({ ...detail, ...res.data.result });
  //     setOpen(true);
  //   } else {
  //     notification.open({
  //       message: "DETAIL BOOKING",
  //       description: "Loading failed!",
  //       icon: <CloseOutlined style={{ color: "red" }} />,
  //     });
  //     const obj = {
  //       createdBy: "",
  //       phoneNumber: "",
  //       email: "",
  //       roomId: "",
  //       debtAmount: "",
  //       createdAt: "",
  //       serviceName: "",
  //       chooseDate: "",
  //     };
  //     setDetail({ ...detail, ...obj });
  //   }
  // };
  // const onClose = () => {
  //   setOpen(false);
  // };
  // // const handleOk = async (id, value) => {
  // //   const obj = {
  // //     reply: value.feedbacks,
  // //   };
  // //   const res = await replyFeedbacks(id, obj);
  // //   if (res === 200) {
  // //     notification.open({
  // //       message: "REPLY",
  // //       description: "Reply success",
  // //       icon: <DownOutlined style={{ color: "green" }} />,
  // //     });
  // //     getAllFeedbacks(payload);
  // //   }
  // //   setIsModalOpen(false);
  // // };
  // // const handleCancel = () => {
  // //   setIsModalOpen(false);
  // // };
  // // const onDelete = async (id) => {
  // //   const res = await deleteFeedbacks(id);
  // //   if (res === 200) {
  // //     notification.open({
  // //       message: "DELETE",
  // //       description: "Delete success",
  // //       icon: <DownOutlined style={{ color: "green" }} />,
  // //     });
  // //     getAllServices(payload);
  // //   }
  // // };
  // const onSearch = (value) => {
  //   setData();
  //   setPayload({
  //     ...payload,
  //     search: value,
  //     paging: {
  //       pageIndex: 1,
  //     },
  //   });
  // };
  // const onApprove = async (id) => {
  //   const res = await approveServices(id);
  //   if (res.status === 200) {
  //     notification.open({
  //       message: "APPROVED",
  //       description: "Has approved !",
  //       icon: <CheckOutlined style={{ color: "green" }} />,
  //     });
  //     getAllServices(payload);
  //   } else {
  //     notification.open({
  //       message: "APPROVED",
  //       description: "Approving failed!",
  //       icon: <CloseOutlined style={{ color: "red" }} />,
  //     });
  //   }
  // };
  // const onReject = async (id) => {
  //   const res = await rejectServices(id);
  //   if (res.status === 200) {
  //     notification.open({
  //       message: "REJECTED",
  //       description: "Has rejected !",
  //       icon: <CheckOutlined style={{ color: "green" }} />,
  //     });
  //     getAllServices(payload);
  //   } else {
  //     notification.open({
  //       message: "APPROVED",
  //       description: "Rejecting failed!",
  //       icon: <CloseOutlined style={{ color: "red" }} />,
  //     });
  //   }
  // };
  // const handleFilter = (value) => {
  //   if (!value) {
  //     setData(services);
  //   } else {
  //     const date1 = value[0].toDate().valueOf();
  //     const date2 = value[1].toDate().valueOf();
  //     console.log(date2);
  //     const filterArr = services.filter((val) => {
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
  //   <div className="servicePage">
  //     <BreadcrumbComponent />
  //     <h4>{i18n.t("ListBooking")}</h4>
  //     <div className="search">
  //       <Row>
  //         <Col span={8}>
  //           <Search
  //             placeholder={i18n.t("searchServiceName")}
  //             onSearch={onSearch}
  //             enterButton
  //             className="searchService"
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
  //               placeholder={[i18n.t("startDate"), i18n.t("endDate")]}
  //             />
  //           </Input.Group>
  //         </Col>
  //       </Row>
  //     </div>
  //     <Spin tip="Loading..." spinning={isLoading}>
  //       <Table
  //         style={{ marginTop: 30 }}
  //         columns={columns}
  //         dataSource={!data ? services : data}
  //         onChange={handleTableChange}
  //         pagination={{ ...payload.paging, total: total }}
  //       />
  //     </Spin>
  //     <Drawer
  //       title="Booking Detail Information"
  //       placement="right"
  //       onClose={onClose}
  //       open={open}
  //       width={600}
  //     >
  //       <div className="rightTab">
  //         <button className="approve" onClick={() => onApprove(detail.id)}>
  //           <CheckOutlined style={{ paddingRight: 5 }} />
  //           {i18n.t("approved")}
  //         </button>
  //         <button className="reject" onClick={() => onReject(detail.id)}>
  //           <CloseOutlined style={{ paddingRight: 5 }} />
  //           {i18n.t("rejected")}
  //         </button>
  //         <hr />
  //         <Row>
  //           <Col span={10}>
  //             {i18n.t("createdBy")}: <strong>{detail.createdBy}</strong>
  //           </Col>
  //           <Col span={10} offset={4}>
  //             {i18n.t("phoneNum")}: <strong>{detail.phoneNumber}</strong>
  //           </Col>
  //         </Row>
  //         <Row>
  //           <Col span={8}>
  //             Email: <strong>{detail.email}</strong>
  //           </Col>
  //         </Row>
  //         <Row>
  //           <Col span={10}>
  //             {i18n.t("room")}: <strong>{detail.roomId}</strong>
  //           </Col>
  //           <Col span={10} offset={4}>
  //             {i18n.t("debt")}: <strong>{detail.debtAmount}</strong>
  //           </Col>
  //         </Row>
  //         <Row>
  //           <Col span={10}>
  //             {i18n.t("createdAt")}: <strong>{detail.createdAt}</strong>
  //           </Col>
  //           <Col span={10} offset={4}>
  //             {i18n.t("description")}: <strong>{detail.serviceName}</strong>
  //           </Col>
  //         </Row>
  //         <hr />
  //         <Row>
  //           <Col span={24}>
  //             {i18n.t("serviceName")}: <strong>{detail.serviceName}</strong>
  //           </Col>
  //         </Row>
  //         <Row>
  //           <Col span={8}>
  //             {i18n.t("chooseAt")}: <strong>{detail.chooseDate}</strong>
  //           </Col>
  //         </Row>
  //         <Row>
  //           <Col span={10}>
  //             {i18n.t("startTime")}: <strong></strong>
  //           </Col>
  //           <Col span={10} offset={4}>
  //             {i18n.t("endTime")}: <strong></strong>
  //           </Col>
  //         </Row>
  //       </div>
  //     </Drawer>
  //   </div>
  // );
};

export default BookingServiceComponent;
