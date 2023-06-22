import "./user.css";
import BreadcrumbComponent from "./../../Component/Breadcrumb/index";
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
  Upload,
  Drawer,
  Table,
  Typography,
  Space,
  Dropdown,
  Menu,
  Radio,
  Select,
  Divider,
} from "antd";
import {
  DownOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Search from "antd/lib/input/Search";
import { useTranslation, withTranslation } from "react-i18next";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetAllUserMutation,
  useGetUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../services/User";
const { TabPane } = Tabs;
const UserManagement = (props) => {
  const { Option } = Select;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [result, setResult] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [username, setUsername] = useState(false);
  const [filterInput, setFilterInput] = useState("");
  const [listAccount, setListAccount] = useState([]);
  const [getAllUser] = useGetAllUserMutation();
  const [getUser] = useGetUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );
  const [pageCustum, setPageCustum] = useState({
    search: "",
    paging: {
      pageIndex: 1,
      pageSize: 10,
    },
    sorting: {
      field: "username",
      order: "asc",
    },
    url: "All",
  });
  useEffect(() => {
    setListAccount([]);
    if (getAllUser.status === "fulfilled") {
      setListAccount((prev) => [...prev, ...getAllUser.data.data]);
    }
  }, []);

  const { i18n } = useTranslation();
  const showDrawer = async (id) => {
    setIsEdit(true);
    setOpen(true);
    await getUser({ id: id })
      .unwrap()
      .then((payload) => {
        console.log(payload);
        if (payload.data) {
          form.setFieldsValue({
            Id: payload.data._id,
            Name: payload.data.name,
            Email: payload.data.email,
            Phone: payload.data.phone,
            Status: payload.data.isActive === true ? "Active" : "Inactive",
            Address:
              payload.data.role === "company" ? payload.data.address : "None",
          });
        }
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          if (error.status === 401) {
            localStorage.clear();
            window.location.reload();
          }
        }
      });
    // setUsername(res.username);
  };
  const onClose = () => {
    setOpen(false);
    setIsEdit(false);
  };
  // //Pagination
  const onChangePage = (page) => {
    const nextPage = {
      ...pageCustum,
      paging: {
        pageIndex: page.current,
        pageSize: 10,
      },
    };
    setPageCustum(nextPage);
  };
  // //Thay đổi tab
  const onChange = (key) => {
    console.log(key);
    if (getAllUser.status === "fulfilled") {
      if (key === "all") {
        setListAccount([]);
        setListAccount((prev) => [...prev, ...getAllUser.data.data]);
      } else {
        let arr = [];
        getAllUser.data.data.map((val) => {
          if (val.role.includes(key)) {
            arr.push(val);
          }
        });
        setListAccount([]);
        setListAccount((prev) => [...prev, ...arr]);
      }
    }
  };
  // //Tạo hàm tìm kiếm
  const filterData = () => {
    if (filterInput === "") return listAccount;
    if (isNaN(filterInput)) {
      return listAccount.filter(({ email }) => email.includes(filterInput));
    }
    return listAccount.filter(({ email }) => email === filterInput);
  };
  const handleCreate = () => {
    setIsEdit(false);
    setIsModalOpen(true);
    form.setFieldsValue({
      Name: "",
      Email: "",
      Phone: "",
      Opentime: "",
      Closetime: "",
      Longitude: "",
      Latitude: "",
      Address: "",
    });
  };
  const onSubmit = async (values) => {
    console.log(values);
    if (isEdit) {
      updateUser({ id: values.Id, name: values.Name, phone: values.Phone })
        .unwrap()
        .then((payload) => {
          console.log(payload);
          if (payload.success === true) {
            setOpen(false);
            notification.open({
              message: "Update profile",
              description: "Success",
            });
            window.location.reload(true);
          } else {
            notification.open({
              message: "Update profile",
              description: "False",
            });
          }
        });
    } else {
      // const response = await createCodeDispatch(values);
      // console.log(response.status);
      // if (response.data.code === 200) {
      //   notification.open({
      //     message: "Update Cost File",
      //     description: "Success",
      //   });
      // } else {
      //   notification.open({
      //     message: "Request error 500",
      //     description: "Object reference not set to an instance of an object.",
      //   });
      // }
    }
    handleCancel();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // //Xóa thành viên
  const handleDelete = async (username) => {
    // const response = await deleteAccountDispatch(username);
    // if (response.status === 200) {
    //   getAllAccountDispatch(pageCustum);
    //   notification.open({
    //     message: "Delete member",
    //     description: "Success",
    //   });
    // }
  };
  // //Menu action
  const menu = (
    <Menu
      items={[
        {
          label: <Link to="/userManagement/create">Create New User</Link>,
          key: "1",
          icon: <UserOutlined />,
        },
        {
          label: (
            <Button onClick={() => handleCreate()} style={{ border: "none" }}>
              Update Dept Amount
            </Button>
          ),
          key: "2",
          icon: <UserOutlined />,
        },
      ]}
    />
  );
  // //Bảng dữ liệu
  const columns = [
    {
      title: "Id",
      key: "id",
      render: (text, record, index) =>
        (pageCustum.paging.pageIndex - 1) * pageCustum.paging.pageSize +
        index +
        1,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      render: (_, record) => (
        <a onClick={() => showDrawer(record._id)}>{record.email}</a>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (_, record) => {
        return (
          <Tag
            icon={
              record.isActive === true ? (
                <CheckCircleOutlined />
              ) : (
                <CloseCircleOutlined />
              )
            }
            color={record.isActive === true ? "green" : "volcano"}
          ></Tag>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
    },
    {
      title: "Action",
      render: (text, record) => {
        return (
          <Space>
            <Button onClick={() => handleDelete(record.username)}>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];
  // //Tab
  const items = [
    { label: "All", key: "all" },
    { label: "Customer", key: "customer" },
    { label: "Company", key: "company" },
    { label: "Admin", key: "admin" },
  ];
  return (
    <>
      <BreadcrumbComponent />
      <h3>Users Management</h3>
      {/* Search và acction */}
      <Row justify="start" style={{ padding: " 10px 0" }}>
        <Col span={8}>
          <Search
            placeholder="Search by email"
            onSearch={setFilterInput}
            enterButton="Search"
          />
        </Col>
        <Col span={16}>
          <Button style={{ float: "right" }} onClick={() => handleCreate()}>
            <Space>Add Company Account</Space>
          </Button>
        </Col>
      </Row>
      {/* Tab phân loại */}
      <Tabs items={items} onChange={onChange} />
      {/* Gọi bảng */}
      <Table
        columns={columns}
        dataSource={filterData()}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
          pageIndex: listAccount.paging?.pageIndex,
          pageSize: listAccount.paging?.pageSize,
          total: listAccount.length,
        }}
        onChange={onChangePage}
      />
      <Modal
        title="Create Company Account"
        open={isModalOpen}
        onCancel={() => handleCancel()}
        width={700}
        footer={
          <Button type="primary" htmlType="submit" form="form">
            Submit
          </Button>
        }
        style={{ padding: "0px 20px", color: "#F2A902" }}
      >
        <Form
          form={form}
          name="form"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          autoComplete="off"
          layout="horizontal"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="Name" label="Name">
                <Input style={{ border: "1px solid #100444", width: 200 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Email" label="Email">
                <Input style={{ border: "1px solid #100444", width: 200 }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="Phone" label="Phone">
                <Input style={{ border: "1px solid #100444", width: 200 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Address" label="Address">
                <Input style={{ border: "1px solid #100444", width: 200 }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="Opentime" label="Opentime">
                <Input style={{ border: "1px solid #100444", width: 200 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Closetime" label="Closetime">
                <Input style={{ border: "1px solid #100444", width: 200 }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="Longitude" label="Logitude">
                <Input style={{ border: "1px solid #100444", width: 200 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Latitude" label="Latitude">
                <Input style={{ border: "1px solid #100444", width: 200 }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Drawer
        title="Edit User Profile"
        width={500}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
          marginTop: 50,
        }}
      >
        <Form
          form={form}
          name="form"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          autoComplete="off"
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="Id" label="Id">
                <Input style={{ border: "1px solid #100444", width: 220 }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="Name" label="Name">
                <Input style={{ border: "1px solid #100444", width: 220 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Email" label="Email">
                <Input
                  style={{ border: "1px solid #100444", width: 220 }}
                  readOnly={true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="Phone" label="Phone">
                <Input style={{ border: "1px solid #100444", width: 220 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Status" label="Status">
                <Input
                  style={{ border: "1px solid #100444", width: 220 }}
                  readOnly={true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Button
              type="primary"
              htmlType="submit"
              form="form"
              style={{
                width: "100%",
                backgroundColor: "#F2A902",
              }}
            >
              Submit
            </Button>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default UserManagement;
