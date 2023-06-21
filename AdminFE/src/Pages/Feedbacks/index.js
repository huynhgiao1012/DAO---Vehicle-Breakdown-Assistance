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
  Form,
  Space,
  notification,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import React from "react";

import { useEffect, useState } from "react";
import BreadcrumbComponent from "../../Component/Breadcrumb";

import "./style/feedbacks.css";
import { useTranslation, withTranslation } from "react-i18next";

const { Search, TextArea } = Input;

const FeedbackComponent = (props) => {
  // const {
  //   getAllFeedbacks,
  //   isLoading,
  //   feedbacks,
  //   total,
  //   replyFeedbacks,
  //   deleteFeedbacks,
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
  // });
  // useEffect(() => {
  //   const res = getProfile({ username: localStorage.getItem("username") });
  //   if (res.status === 200) {
  //     getAllFeedbacks(payload);
  //   }
  // }, []);
  // useEffect(() => {
  //   i18n.changeLanguage(localStorage.getItem("lang"));
  //   getAllFeedbacks(payload);
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
  //     title: i18n.t("Status"),
  //     dataIndex: "status",
  //     sorter: true,
  //     key: "status",
  //     render: (text, record) => (
  //       <>
  //         {record.status === "REPLIED" ? (
  //           <div className="green">{i18n.t("replied")}</div>
  //         ) : (
  //           <div className="yellow">{i18n.t("waitingRep")}</div>
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
  // const showModal = (record) => {
  //   setRecord(record);
  //   setIsModalOpen(true);
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
  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };
  // const onDelete = async (id) => {
  //   const res = await deleteFeedbacks(id);
  //   if (res === 200) {
  //     notification.open({
  //       message: "DELETE",
  //       description: "Delete success",
  //       icon: <DownOutlined style={{ color: "green" }} />,
  //     });
  //     getAllFeedbacks(payload);
  //   }
  // };
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
  // const handleFilter = (value) => {
  //   if (!value) {
  //     setData(feedbacks);
  //   } else {
  //     const date1 = value[0].toDate().valueOf();
  //     const date2 = value[1].toDate().valueOf();
  //     console.log(date2);
  //     const filterArr = feedbacks.filter((val) => {
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
  //   <div className="feedbackPage">
  //     <BreadcrumbComponent />
  //     <h4>{i18n.t("Feedbacks")}</h4>
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
  //         dataSource={!data ? feedbacks : data}
  //         pagination={{
  //           total: total,
  //           showSizeChanger: true,
  //           pageSizeOptions: ["10"],
  //         }}
  //         onChange={handleTableChange}
  //       />
  //     </Spin>
  //     <Modal
  //       title={record.title}
  //       open={isModalOpen}
  //       footer={[]}
  //       onCancel={handleCancel}
  //     >
  //       <Form
  //         layout="vertical"
  //         name="form_in_modal"
  //         onFinish={(value) => handleOk(record.id, value)}
  //       >
  //         <img
  //           src="https://kienthucbonphuong.com/images/202001/feedback-la-gi/feedback-la-gi.png"
  //           alt="Error"
  //           width="80%"
  //           style={{ marginLeft: 50, marginRight: 40 }}
  //         />
  //         <Form.Item name="feedbacks" label={record.title}>
  //           <TextArea
  //             rows={4}
  //             placeholder="Give feedback here..."
  //             maxLength={300}
  //           />
  //         </Form.Item>
  //         <Space>
  //           <Button onClick={() => handleCancel()}>Close</Button>
  //           <Button type="primary" htmlType="submit">
  //             Submit
  //           </Button>
  //         </Space>
  //       </Form>
  //     </Modal>
  //   </div>
  // );
};
export default FeedbackComponent;
