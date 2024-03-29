import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetAllUserMutation,
  useGetUserMutation,
} from "../../services/User";
import {
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Alert,
} from "@mui/material";
import { Col, Form, Input, Row, Drawer, notification } from "antd";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useCreateCompanyMutation } from "../../services/Company";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "white",
  border: "2px solid #6439ff",
  boxShadow: 24,
  p: 4,
};
const Datatable = () => {
  const [data, setData] = useState([]);
  const [tab, settab] = useState(10);
  const [detail, setDetailUser] = useState({});
  const [getAllUser] = useGetAllUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [createUser] = useCreateCompanyMutation();
  const [getUser] = useGetUserMutation();
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    setOpen(true);
    getUser({ id: id })
      .unwrap()
      .then((payload) => {
        console.log(payload);
        form.setFieldsValue({
          Id: payload.data._id,
          Name: payload.data.name,
          Email: payload.data.email,
          Phone: payload.data.phone,
          Status: payload.data.isActive === true ? "Active" : "Inactive",
          Role: payload.data.role,
        });
      });
  };
  const handleClose = () => setOpen(false);

  const loadData = () => {
    setData([]);
    getAllUser()
      .unwrap()
      .then((payload) => {
        if (payload.success === true) {
          let newArr = [];
          payload.data.map((val, index) => {
            newArr.push({
              id: val._id,
              username: val.name,
              img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
              status: val.isActive ? "active" : "inactive",
              email: val.email,
              phone: val.phone,
              role: val.role,
              dbId: val._id,
            });
          });
          setData((prev) => [...prev, ...newArr]);
        }
      });
  };
  useEffect(() => {
    setData([]);
    getAllUser()
      .unwrap()
      .then((payload) => {
        if (payload.success === true) {
          let newArr = [];
          payload.data.map((val, index) => {
            newArr.push({
              id: val._id,
              username: val.name,
              img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
              status: val.isActive ? "active" : "inactive",
              email: val.email,
              phone: val.phone,
              role: val.role,
              dbId: val._id,
            });
          });
          setData((prev) => [...prev, ...newArr]);
        }
      })
      .catch((error) => {
        if (error.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      });
    if (getAllUser.error) {
      <Alert severity="error">
        {getAllUser.error.data.message}...Please login again !
      </Alert>;
      localStorage.clear();
      navigate("/login");
    }
  }, []);
  const handleDelete = async (id) => {
    await deleteUser({ id: id })
      .unwrap()
      .then((payload) => {
        if (payload.success) {
          <Alert severity="success">{payload.message}</Alert>;
        }
      });
    setData(data.filter((item) => item.id !== id));
    loadData();
  };
  const handleEdit = (id) => {
    handleOpen(id);
    setIsEdit(true);
  };
  const handleView = (id) => {
    handleOpen(id);
    setIsEdit(false);
  };
  const handleCreate = () => {
    setIsModalOpen(true);
    setIsEdit(false);
  };
  const onSubmit = async (values) => {
    console.log(values);
    if (isEdit) {
      await updateUser({
        id: values.Id,
        name: values.Name,
        phone: values.Phone,
      })
        .unwrap()
        .then((payload) => {
          if (payload.success === true) {
            setOpen(false);
            notification.open({
              message: "Update profile",
              description: "Success",
            });
            loadData();
          } else {
            notification.open({
              message: "Update profile",
              description: "False",
            });
          }
        });
    } else {
      await createUser({
        name: values.Name,
        email: values.Email,
        phone: values.Phone,
        openTime: values.Opentime,
        closeTime: values.Closetime,
        long: Number(values.Longitude),
        lat: Number(values.Latitude),
        address: values.Address,
      })
        .unwrap()
        .then((payload) => {
          alert(payload.message);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.log(error);
          alert(error.data.message.duplicate);
        });
    }
  };
  const handleChange = (SelectChangeEvent) => {
    settab(SelectChangeEvent.target.value);
    var newArr = [];
    getAllUser()
      .unwrap()
      .then((payload) => {
        if (payload.success === true) {
          payload.data.map((val) => {
            newArr.push({
              id: val._id,
              username: val.name,
              img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
              status: val.isActive ? "active" : "inactive",
              email: val.email,
              phone: val.phone,
              role: val.role,
              dbId: val._id,
            });
          });
        }
        if (SelectChangeEvent.target.value === 20) {
          const arr = newArr.filter((val) => {
            if (val.role === "customer") {
              return val;
            }
          });
          setData([]);
          setData((prev) => [...prev, ...arr]);
        } else if (SelectChangeEvent.target.value === 30) {
          const arr = newArr.filter((val) => {
            if (val.role === "company") {
              return val;
            }
          });
          setData([]);
          setData((prev) => [...prev, ...arr]);
        } else if (SelectChangeEvent.target.value === 40) {
          const arr = newArr.filter((val) => {
            if (val.role === "admin") {
              return val;
            }
          });
          setData([]);
          setData((prev) => [...prev, ...arr]);
        } else {
          setData([]);
          setData((prev) => [...prev, ...newArr]);
        }
      });
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => handleView(params.row.id)}
            >
              View
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
            <div
              className="editButton"
              onClick={() => handleEdit(params.row.id)}
            >
              Edit
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-simple-select-label">Tab</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tab}
            label="Tab"
            onChange={handleChange}
          >
            <MenuItem value={10}>All</MenuItem>
            <MenuItem value={20}>Customer</MenuItem>
            <MenuItem value={30}>Company</MenuItem>
            <MenuItem value={40}>Admin</MenuItem>
          </Select>
        </FormControl>
        <div className="addButton" onClick={handleCreate}>
          <p
            style={{
              fontSize: 16,
              color: "#6439ff",
              width: 160,
              height: 15,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Add new company
          </p>
        </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        disableVirtualization
      />
      <div>
        <Modal
          open={isModalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              style={{
                textAlign: "center",
                color: "#6439ff",
                fontWeight: "bold",
                marginBottom: 20,
                fontSize: 22,
              }}
            >
              ADD NEW COMPANY
            </Typography>
            <Form
              form={form}
              name="form"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 18 }}
              initialValues={{ remember: true }}
              onFinish={onSubmit}
              autoComplete="off"
              layout="vertical"
              style={{ marginLeft: 30 }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="Name"
                    label="Name"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter name",
                        type: "string",
                      },
                      { whitespace: true },
                      { min: 3 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #6439ff", width: 220 }}
                      type="string"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="Email"
                    label="Email"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter email",
                        type: "email",
                      },
                      { whitespace: false },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #6439ff", width: 220 }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="Phone"
                    label="Phone"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter phone",
                        type: "string",
                      },
                      { whitespace: false },
                      { min: 10, max: 12 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #6439ff", width: 220 }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="Address"
                    label="Address"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter address",
                        type: "string",
                      },
                      { whitespace: true },
                      { min: 10 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #6439ff", width: 220 }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="Opentime"
                    label="Opentime"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter open time",
                        type: "string",
                      },
                      { whitespace: false },
                      { min: 3, max: 4 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #6439ff", width: 220 }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="Closetime"
                    label="Closetime"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter close time",
                        type: "string",
                      },
                      { whitespace: false },
                      { min: 3, max: 4 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #6439ff", width: 220 }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="Longitude"
                    label="Logitude"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter logitude",
                      },
                      { whitespace: false },
                      { min: 3 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #6439ff", width: 220 }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="Latitude"
                    label="Latitude"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter latitude",
                      },
                      { whitespace: false },
                      { min: 3 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #6439ff", width: 220 }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                form="form"
                style={{
                  width: "90%",
                  textAlign: "center",
                  backgroundColor: "#6439ff",
                  color: "white",
                  margin: "10px 30px",
                }}
              >
                Submit
              </Button>
              <Button
                onClick={() => setIsModalOpen(false)}
                style={{
                  width: "90%",
                  textAlign: "center",
                  backgroundColor: "#6439ff",
                  color: "white",
                  margin: "10px 30px",
                }}
              >
                Cancel
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
      <Drawer
        title={isEdit ? "Edit User Detail" : "User Detail"}
        width={500}
        onClose={handleClose}
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
                <Input
                  style={{ border: "1px solid #100444", width: 220 }}
                  readOnly={true}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Role" label="Role">
                <Input
                  style={{ border: "1px solid #100444", width: 220 }}
                  readOnly={true}
                />
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
          {isEdit && (
            <Row gutter={16}>
              <Button
                type="primary"
                htmlType="submit"
                form="form"
                style={{
                  width: "100%",
                  backgroundColor: "#6439ff",
                  color: "white",
                }}
              >
                Submit
              </Button>
            </Row>
          )}
        </Form>
      </Drawer>
    </div>
  );
};

export default Datatable;
