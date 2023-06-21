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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RegisterForm = (props) => {
  // const navigate = useNavigate();
  // const { Option } = Select;
  // const [form] = Form.useForm()
  // const { createAccoutDispatch } = props;
  // const {  newAccount } = props;
  // const onSubmit = async (values) => {
  //     const response = await createAccoutDispatch(values)
  //     console.log(response.status)
  //     if (response.data.code === 200) {
  //       notification.open({
  //         message: 'Add new member',
  //         description: 'Success'
  //       });
  //       navigate("/userManagement");
  //     }
  //   }
  // return <>
  //  <Form
  //     form={form}
  //     name="form"
  //     labelCol={{ span: 6 }}
  //     wrapperCol={{ span: 18 }}
  //     initialValues={{ remember: true, }}
  //     onFinish={onSubmit}
  //     autoComplete="off"
  //     layout='horizontal'
  //   >
  //     {/* username */}
  //     <Form.Item
  //       label="Username"
  //       name="username"
  //       rules={[
  //         {
  //           required: true,
  //           message: "Please enter Username",
  //         },
  //       ]}
  //     >
  //       <Input />
  //     </Form.Item>
  //     {/* Fullname */}
  //     <Form.Item
  //       label="Full Name"
  //       name="fullName"
  //       rules={[
  //         {
  //           required: true,
  //           message: "Please enter Full Name",
  //         },
  //       ]}
  //     >
  //       <Input />
  //     </Form.Item>
  //     {/* Email */}
  //     <Form.Item
  //       label="Email"
  //       name="email"
  //     >
  //       <Input />
  //     </Form.Item>
  //     {/* Điện thoại */}
  //     <Form.Item
  //       label="Phone"
  //       name="phoneNumber"
  //     >
  //       <Input.Group size="large">
  //         <Row>
  //           <Col span={4}>
  //             <Input defaultValue="+84" disabled />
  //           </Col>
  //           <Col span={20}>
  //             <Input />
  //           </Col>
  //         </Row>
  //       </Input.Group>
  //     </Form.Item>
  //     {/* Địa chỉ */}
  //     <Form.Item
  //       label="Address"
  //       name="address"
  //     >
  //       <Input />
  //     </Form.Item>
  //     {/* Giới tính */}
  //     <Form.Item
  //       label="Gender"
  //       name="gender"
  //     >
  //       <Radio.Group value={"MALE"}>
  //         <Radio value={"MALE"}>Male</Radio>
  //         <Radio value={"FEMALE"}>Female</Radio>
  //       </Radio.Group>
  //     </Form.Item>
  //     {/* Phòng */}
  //     <Form.Item
  //       label="Room"
  //       name="roomId"
  //     >
  //       <Select>
  //         <Option value={'3401'}>T4-3401</Option>
  //         <Option value={'3402'}>T4-3402</Option>
  //         <Option value={'3403'}>T4-3403</Option>
  //         <Option value={'3404'}>T4-3404</Option>
  //       </Select>
  //     </Form.Item>
  //     {/* quyền */}
  //     <Form.Item
  //       label="Role"
  //       name="roleId"
  //     >
  //       <Select>
  //         <Option value={'Accountant'}>Accountant</Option>
  //         <Option value={'Admin'}>Admin</Option>
  //         <Option value={'Guest'}>Guest</Option>
  //         <Option value={'Owner'}>Owner</Option>
  //       </Select>
  //     </Form.Item>
  //   </Form>
  //   <Button type='primary' htmlType='submit' form='form'>Submit</Button>
  //   {/* <Button><Link to="userManagement" />123</Button> */}
  // </>;
};

export default RegisterForm;
