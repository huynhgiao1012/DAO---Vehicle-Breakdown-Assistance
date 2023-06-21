import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  notification,
  Popconfirm,
  Row,
  Spin,
  Table,
  Typography,
} from "antd";

import Search from "antd/lib/input/Search";
import { PaperClipOutlined } from "@ant-design/icons";
import BreadcrumbComponent from "../../Component/Breadcrumb";
// import { compose } from "recompose";
import { useTranslation, withTranslation } from "react-i18next";

import { useEffect, useState } from "react";
import UploadComponent from "../../Component/UploadComponent";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const { Title } = Typography;
const { Link } = Typography;
const News = (props) => {
  // const {
  //   getAllNews,
  //   createNews,
  //   deleteNews,
  //   editNews,
  //   news,
  //   isLoading,
  //   total,
  //   getDetailNews,
  //   getProfile,
  // } = props;
  // //payload
  // const [visible, setVisible] = useState(false);
  // const [isEdit, setIsEdit] = useState(true);
  // const [id, setId] = useState(true);
  // const [formModal] = Form.useForm();
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
  // const { i18n } = useTranslation();
  // const onDelete = async (id) => {
  //   const response = await deleteNews(id);
  //   if (response.data.code === 200) {
  //     const response = getAllNews(payload);
  //     if (response) {
  //       notification["success"]({
  //         message: i18n.t("Announcement"),
  //         description: i18n.t("success.delete"),
  //       });
  //     }
  //   } else {
  //     notification["error"]({
  //       message: i18n.t("error.label"),
  //       description: i18n.t("error.description"),
  //     });
  //   }
  // };
  // const onEdit = async (id) => {
  //   setIsEdit(true);
  //   setId(id);
  //   const response = await getDetailNews(id);
  //   if (response.data.code === 200) {
  //     formModal.setFieldsValue(response.data.result);
  //     const currentImg = {
  //       uid: "-1",
  //       name: "image.png",
  //       status: "done",
  //       url: `data:image/jpeg;charset=utf-8;base64, ${response.data.result.imageUrl}`,
  //     };
  //     setFileList([currentImg]);
  //     setVisible(true);
  //   } else {
  //     notification["error"]({
  //       message: i18n.t("error.label"),
  //       description: i18n.t("error.description"),
  //     });
  //   }
  // };
  // const onFinish = async (values) => {
  //   let result = new FormData();
  //   result.append("file", values.file?.file?.originFileObj);
  //   result.append("title", values.title);
  //   result.append("description", values.description);
  //   result.append("tag", values.tag);
  //   if (isEdit) {
  //     const response = await editNews({ form: result, id: id });
  //     if (response.data?.code === 200) {
  //       await getAllNews(payload);
  //       notification["success"]({
  //         message: i18n.t("success.edit"),
  //       });
  //       formModal.resetFields();
  //       handleCancel();
  //     } else {
  //       notification["error"]({
  //         message: response.statusText,
  //       });
  //     }
  //   } else {
  //     const response = await createNews(result);
  //     if (response.data?.code === 200) {
  //       await getAllNews(payload);
  //       notification["success"]({
  //         message: i18n.t("success.create"),
  //       });
  //       formModal.resetFields();
  //       handleCancel();
  //     } else {
  //       notification["error"]({
  //         message: response.statusText,
  //       });
  //     }
  //   }
  // };
  // //get initial state
  // useEffect(
  //   () => {
  //     i18n.changeLanguage(localStorage.getItem("lang"));
  //     getAllNews(payload);
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [payload]
  // );
  // const columns = [
  //   {
  //     title: i18n.t("Id"),
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
  //     render: (text, record, index) => {
  //       return (
  //         <Link
  //           key={record.id}
  //           onClick={() => {
  //             onEdit(record.id);
  //           }}
  //         >
  //           {record.title}
  //         </Link>
  //       );
  //     },
  //     sorter: true,
  //     key: "title",
  //     dataIndex: "title",
  //   },
  //   {
  //     title: i18n.t("tag"),
  //     dataIndex: "tag",
  //     sorter: true,
  //     key: "tag",
  //   },
  //   {
  //     title: i18n.t("createdAt"),
  //     dataIndex: "createdAt",
  //     sorter: true,
  //     key: "createdAt",
  //   },
  //   {
  //     title: i18n.t("createdBy"),
  //     dataIndex: "createdBy",
  //     sorter: true,
  //     key: "createdBy",
  //   },
  //   {
  //     title: i18n.t("action"),
  //     key: "action",
  //     render: (text, record) => (
  //       <Popconfirm
  //         title={i18n.t("confirm")}
  //         key={record.id}
  //         onConfirm={() => {
  //           onDelete(record.id);
  //         }}
  //       >
  //         <Button key={record.id} danger>
  //           {i18n.t("delete")}
  //         </Button>
  //       </Popconfirm>
  //     ),
  //   },
  // ];
  // const handleTableChange = (pagination, filters, sorter) => {
  //   console.log(sorter);
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
  // const onSearch = async (value) => {
  //   setPayload({
  //     ...payload,
  //     search: value,
  //     paging: {
  //       pageIndex: 1,
  //     },
  //   });
  // };
  // const openCreateNews = () => {
  //   formModal.resetFields();
  //   setVisible(true);
  //   setIsEdit(false);
  // };
  // const handleCancel = () => {
  //   setVisible(false);
  //   setFileList([]);
  // };
  // const [fileList, setFileList] = useState([]);
  // const propsUpload = {
  //   action: "https://quanlycudan.azurewebsites.net/administrator/news/create",
  //   onRemove: (file) => {
  //     const index = fileList.indexOf(file);
  //     const newFileList = fileList.slice();
  //     newFileList.splice(index, 1);
  //     setFileList(newFileList);
  //   },
  //   onChange: async (info) => {
  //     const file = info.file;
  //     const isJpgOrPng =
  //       file.type === "image/jpeg" || file.type === "image/png";
  //     if (!isJpgOrPng) {
  //       message.error(i18n.t("error.file"));
  //     }
  //     const isLt2M = file.size / 1024 / 1024 < 2;
  //     if (!isLt2M) {
  //       message.error(i18n.t("error.fileSize"));
  //     }
  //     if (isJpgOrPng && isLt2M) {
  //       setFileList([file]);
  //     }
  //   },
  //   fileList,
  // };
  // return (
  //   <div>
  //     <BreadcrumbComponent />
  //     <Title type="secondary" level={4}>
  //       {i18n.t("NewsManage")}
  //     </Title>
  //     <Row justify="start" style={{ padding: " 10px 0" }}>
  //       <Col span={8}>
  //         <Search
  //           placeholder={i18n.t("search.news")}
  //           onSearch={onSearch}
  //           enterButton
  //         />
  //       </Col>
  //       <Col span={16}>
  //         <Button
  //           block={false}
  //           ghost={false}
  //           htmlType="button"
  //           icon={<PaperClipOutlined />}
  //           loading={false}
  //           style={{ float: "right" }}
  //           type="primary"
  //           onClick={() => openCreateNews()}
  //         >
  //           {i18n.t("create.news")}
  //         </Button>
  //       </Col>
  //     </Row>
  //     <Table
  //       onChange={handleTableChange}
  //       pagination={{ ...payload.paging, total: total }}
  //       loading={isLoading}
  //       dataSource={news}
  //       columns={columns}
  //       rowKey="id"
  //     />
  //     <Modal
  //       title={isEdit ? i18n.t("edit.news") : i18n.t("create.news")}
  //       open={visible}
  //       onCancel={handleCancel}
  //       width={1000}
  //       footer={
  //         <Button type="primary" htmlType="submit" form="formModal">
  //           {i18n.t("save")}
  //         </Button>
  //       }
  //       forceRender
  //     >
  //       <Spin tip={i18n.t("loading")} spinning={isLoading}>
  //         <Form
  //           labelCol={{ span: 3 }}
  //           wrapperCol={{ span: 21 }}
  //           form={formModal}
  //           name="formModal"
  //           onFinish={onFinish}
  //         >
  //           <Form.Item
  //             name="file"
  //             label={i18n.t("image")}
  //             // rules={[
  //             //   {
  //             //     required: true,
  //             //     message: "Image is required",
  //             //   },
  //             // ]}
  //           >
  //             <UploadComponent {...propsUpload} />
  //           </Form.Item>
  //           <Form.Item
  //             name="title"
  //             label={i18n.t("Title")}
  //             rules={[
  //               {
  //                 required: true,
  //                 message: "Tilte is required",
  //               },
  //             ]}
  //           >
  //             <Input />
  //           </Form.Item>
  //           <Form.Item
  //             name="tag"
  //             label={i18n.t("tag")}
  //             rules={[
  //               {
  //                 required: true,
  //                 message: "Tag is required",
  //               },
  //             ]}
  //           >
  //             <Input />
  //           </Form.Item>
  //           <Form.Item name="description" label={i18n.t("description")}>
  //             <CKEditor
  //               editor={ClassicEditor}
  //               data={formModal.getFieldValue("description")}
  //               onReady={(editor) => {
  //                 // You can store the "editor" and use when it is needed.
  //               }}
  //               onChange={(event, editor) => {
  //                 const data = editor.getData();
  //                 formModal.setFieldsValue({
  //                   description: data,
  //                 });
  //               }}
  //               rules={[
  //                 {
  //                   required: true,
  //                   message: "Description is required",
  //                 },
  //               ]}
  //             />
  //           </Form.Item>
  //         </Form>
  //       </Spin>
  //     </Modal>
  //   </div>
  // );
};

export default withTranslation()(News);
