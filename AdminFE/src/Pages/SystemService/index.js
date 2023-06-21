import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  notification,
  Popconfirm,
  Radio,
  Row,
  Spin,
  Table,
  Tag,
  Typography,
} from "antd";

import Search from "antd/lib/input/Search";
import { PaperClipOutlined } from "@ant-design/icons";
import BreadcrumbComponent from "../../Component/Breadcrumb";
import { useEffect, useState } from "react";
import UploadComponent from "../../Component/UploadComponent";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useTranslation, withTranslation } from "react-i18next";
const { Title } = Typography;
const { Link } = Typography;
const SystemService = (props) => {
  // const { i18n } = useTranslation();
  // const {
  //   getAllService,
  //   createService,
  //   deleteService,
  //   editService,
  //   Service,
  //   isLoading,
  //   total,
  //   getDetailService,
  //   getProfile,
  // } = props;
  // //payload
  // const [visible, setVisible] = useState(false);
  // const [isEdit, setIsEdit] = useState(true);
  // const [id, setId] = useState(true);
  // const [fileList, setFileList] = useState([]);
  // const [fileListVN, setFileListVN] = useState([]);
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
  // const chooseIsQR = (e) => {
  //   console.log("radio checked", e.target.value);
  // };
  // const onDelete = async (id) => {
  //   const response = await deleteService(id);
  //   if (response.data.code === 200) {
  //     const response = getAllService(payload);
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
  //   const response = await getDetailService(id);
  //   if (response.data.code === 200) {
  //     formModal.setFieldsValue(response.data.result);
  //     console.log(response.data.result);
  //     const currentImg = [
  //       {
  //         uid: "-1",
  //         name: "image.png",
  //         status: "done",
  //         thumbUrl: response.data.result.rules,
  //       },
  //     ];
  //     const currentImgVN = [
  //       {
  //         uid: "-1",
  //         name: "image.png",
  //         status: "done",
  //         thumbUrl: response.data.result.rulesVN,
  //       },
  //     ];
  //     setFileList(currentImg);
  //     setFileListVN(currentImgVN);
  //     setVisible(true);
  //   } else {
  //     notification["error"]({
  //       message: i18n.t("error.label"),
  //       description: i18n.t("error.description"),
  //     });
  //   }
  // };
  // const onFinish = async (values) => {
  //   const result = {
  //     ...values,
  //     rules: values.rules?.file?.thumbUrl || values.rules,
  //     rulesvn: values.rulesVN?.file?.thumbUrl || values.rulesVN,
  //     capicity: +values.capicity || 0,
  //     minReorderDate: +values.minReorderDate || 0,
  //     maxReorderDate: +values.maxReorderDate || 0,
  //     cancelReorderDate: +values.cancelReorderDate || 0,
  //   };
  //   delete result.rulesVN;
  //   console.log(result);
  //   if (isEdit) {
  //     const response = await editService({ form: result, id: id });
  //     if (response.data?.code === 200) {
  //       await getAllService(payload);
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
  //     const response = await createService(result);
  //     if (response.data?.code === 200) {
  //       await getAllService(payload);
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
  //     getAllService(payload);
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [payload]
  // );
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
  //     title: i18n.t("ServiceName"),
  //     render: (text, record, index) => {
  //       return (
  //         <Link
  //           key={record.id}
  //           onClick={() => {
  //             onEdit(record.id);
  //           }}
  //         >
  //           {record.name}
  //         </Link>
  //       );
  //     },
  //     sorter: true,
  //     dataIndex: "name",
  //     key: "name",
  //   },
  //   {
  //     title: i18n.t("type"),
  //     dataIndex: "type",
  //     sorter: true,
  //     key: "type",
  //     responsive: ["lg"],
  //     render: (_, record) => {
  //       return (
  //         <Tag
  //           color={
  //             record.type.toLowerCase() === "private"
  //               ? "volcano"
  //               : record.type.toLowerCase() === "public"
  //               ? "green"
  //               : "geekblue"
  //           }
  //           key={record.type}
  //         >
  //           {record.type}
  //         </Tag>
  //       );
  //     },
  //   },
  //   {
  //     title: i18n.t("Status"),
  //     dataIndex: "status",
  //     sorter: true,
  //     key: "status",
  //     responsive: ["md"],
  //     render: (_, record) => {
  //       return (
  //         <Tag
  //           color={
  //             record.status.toLowerCase() === "inactive"
  //               ? "volcano"
  //               : record.status.toLowerCase() === "active"
  //               ? "green"
  //               : "geekblue"
  //           }
  //           key={record.status}
  //         >
  //           {record.status}
  //         </Tag>
  //       );
  //     },
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
  // const openCreateService = () => {
  //   formModal.resetFields();
  //   setVisible(true);
  //   setIsEdit(false);
  // };
  // const handleCancel = () => {
  //   setVisible(false);
  //   setFileList([]);
  //   setFileListVN([]);
  // };
  // const propsUpload = (type) => ({
  //   action:
  //     "https://quanlycudan.azurewebsites.net/administrator/services/create",
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
  //       message.error("error.fileSize");
  //     }
  //     if (isJpgOrPng && isLt2M) {
  //       type === 1 ? setFileList([file]) : setFileListVN([file]);
  //     }
  //   },
  // });
  // return (
  //   <div>
  //     <BreadcrumbComponent />
  //     <Title type="secondary" level={4}>
  //       {i18n.t("SystemSer")}
  //     </Title>
  //     <Row justify="start" style={{ padding: " 10px 0" }}>
  //       <Col span={8}>
  //         <Search
  //           placeholder={i18n.t("search.SystemSer")}
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
  //           onClick={() => openCreateService()}
  //         >
  //           {i18n.t("create.SystemSer")}
  //         </Button>
  //       </Col>
  //     </Row>
  //     <Table
  //       onChange={handleTableChange}
  //       pagination={{ total: total }}
  //       loading={isLoading}
  //       dataSource={Service}
  //       columns={columns}
  //       rowKey="id"
  //     />
  //     <Modal
  //       title={isEdit ? i18n.t("edit.SystemSer") : i18n.t("create.SystemSer")}
  //       open={visible}
  //       onCancel={handleCancel}
  //       footer={
  //         <Button type="primary" htmlType="submit" form="formModal">
  //           {i18n.t("save")}
  //         </Button>
  //       }
  //       width={1000}
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
  //             name="name"
  //             label="Name"
  //             rules={[
  //               {
  //                 required: true,
  //                 message: "Name is required",
  //               },
  //             ]}
  //           >
  //             <Input />
  //           </Form.Item>
  //           <Form.Item
  //             name="type"
  //             label="Type"
  //             rules={[
  //               {
  //                 required: true,
  //                 message: "Type is required",
  //               },
  //             ]}
  //           >
  //             <Input />
  //           </Form.Item>
  //           <Form.Item
  //             name="status"
  //             label="Status"
  //             rules={[
  //               {
  //                 required: true,
  //                 message: "Status is required",
  //               },
  //             ]}
  //           >
  //             <Input />
  //           </Form.Item>
  //           <Form.Item
  //             name="description"
  //             label="Description"
  //             rules={[
  //               {
  //                 required: true,
  //                 message: "Description is required",
  //               },
  //             ]}
  //           >
  //             <CKEditor
  //               editor={ClassicEditor}
  //               data={formModal.getFieldValue("description")}
  //               onChange={(event, editor) => {
  //                 const data = editor.getData();
  //                 formModal.setFieldsValue({
  //                   description: data,
  //                 });
  //               }}
  //             />
  //           </Form.Item>
  //           <Form.Item name="contact" label="Contact">
  //             <Input />
  //           </Form.Item>
  //           <Form.Item name="phoneNumber" label="Phone Number">
  //             <Input />
  //           </Form.Item>
  //           <Form.Item name="email" label="Email">
  //             <Input />
  //           </Form.Item>
  //           <Form.Item name="isQr" label="Is OR">
  //             <Radio.Group onChange={chooseIsQR}>
  //               <Radio value={1}>Yes</Radio>
  //               <Radio value={0}>No</Radio>
  //             </Radio.Group>
  //           </Form.Item>
  //           <Form.Item name="capicity" label="Capacity">
  //             <InputNumber />
  //           </Form.Item>
  //           <Form.Item name="minReorderDate" label="Min Reorder Date">
  //             <InputNumber />
  //           </Form.Item>
  //           <Form.Item name="maxReorderDate" label="Max Reorder Date">
  //             <InputNumber />
  //           </Form.Item>
  //           <Form.Item name="cancelReorderDate" label="Cancel Reorder Date">
  //             <InputNumber />
  //           </Form.Item>
  //           <Form.Item name="imageUrl" label="Image Url">
  //             <Input />
  //           </Form.Item>
  //           <Form.Item name="rules" label="Rules">
  //             <UploadComponent {...propsUpload(1)} fileList={fileList} />
  //           </Form.Item>
  //           <Form.Item name="rulesVN" label="Rules VN">
  //             <UploadComponent {...propsUpload(2)} fileList={fileListVN} />
  //           </Form.Item>
  //         </Form>
  //       </Spin>
  //     </Modal>
  //   </div>
  // );
};

export default withTranslation()(SystemService);
