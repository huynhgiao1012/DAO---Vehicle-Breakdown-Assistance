import BreadcrumbComponent from "./../../Component/Breadcrumb/index";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  InputNumber,
  notification,
  Popconfirm,
  Row,
  Tag,
  Tabs,
  Table,
  Typography,
  Space,
  Dropdown,
  Menu,
  Radio,
  Select,
} from "antd";
import { useTranslation, withTranslation } from "react-i18next";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Configuration = (props) => {
  // const [form] = Form.useForm()
  // const { getDetailConfigDispatch, detailConfig, editConfigDispatch, createConfigDispatch, newConfig} = props;
  // useEffect(() => {
  //  onEdit();
  // }, [])
  // const { i18n } = useTranslation();
  // const onEdit = async () =>{
  //   const res = await getDetailConfigDispatch()
  //   form.setFieldsValue({
  //     email: res.email,
  //     host: res.host,
  //     Port: res.port,
  //     display: res.displayName,
  //     password: res.password,
  // })}
  // const onSubmit = async ({
  //   email: username,
  //   host,
  //   Port,
  //   display,
  //   password,
  // }) => {
  //   const response = await editConfigDispatch({
  //     username,
  //     host,
  //     Port,
  //     display,
  //     password,
  //   })
  //   // console.log({ values })
  //   if (response.status === 200) {
  //     notification.open({
  //       message: 'Chỉnh sửa',
  //       description: 'Cập nhật thông tin thành công'
  //     });
  //   } else {
  //     notification.open({
  //       message: 'Chỉnh sửa',
  //       description: 'Lỗi cập nhật'
  //     });
  //   }}
  // return <>
  // <BreadcrumbComponent/>
  //   <Form
  //     form={form}
  //     name="form"
  //     labelCol={{ span: 4 }}
  //     wrapperCol={{ span: 18 }}
  //     initialValues={{ remember: true, }}
  //     onFinish={onSubmit}
  //     autoComplete="off"
  //     layout='horizontal'
  //   >
  //     {/* Email */}
  //     <Form.Item
  //       label="Email"
  //       name="email"
  //     >
  //       <Input />
  //     </Form.Item>
  //     {/* host*/}
  //     <Form.Item
  //       label="Host"
  //       name="host"
  //     >
  //       <Input />
  //     </Form.Item>
  //     {/* port */}
  //     <Form.Item
  //       label="Port"
  //       name="Port"
  //     >
  //       <InputNumber />
  //     </Form.Item>
  //     {/* Display Name */}
  //     <Form.Item
  //       label="Display Name"
  //       name="display"
  //     >
  //       <Input />
  //     </Form.Item>
  //     {/* Địa chỉ */}
  //     <Form.Item
  //       label="Password"
  //       name="password"
  //     >
  //       <Input.Password />
  //     </Form.Item>
  //   </Form>
  //         <Button type='primary' htmlType='submit' form='form'>Submit</Button>
  // </>;
};

export default withTranslation()(Configuration);
