import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import {
  serviceColumns,
  serviceColumns2,
  formColumn,
} from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetAllUserMutation, useGetUserMutation } from "../../services/User";
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
import { useGetCompanyServiceMutation } from "../../services/Service";
import { useGetAllFormMutation } from "../../services/OrderForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 600,
  bgcolor: "white",
  border: "2px solid #6439ff",
  boxShadow: 24,
  p: 4,
};
const Datatable = () => {
  const [data, setData] = useState([]);
  const [tab, settab] = useState(10);
  const [service, setService] = useState([]);
  const [orderForm, setForm] = useState([]);
  const [getAllUser] = useGetAllUserMutation();
  const [getUser] = useGetUserMutation();
  const [getService] = useGetCompanyServiceMutation();
  const [getAllForm] = useGetAllFormMutation();
  const [isService, setIsService] = useState(false);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    if (isService) {
      setOpen(true);
      getService({ id: id })
        .unwrap()
        .then((payload) => {
          setService([]);
          let newArr = [];
          payload.data.map((val, index) => {
            newArr.push({
              id: val._id,
              service: val.type,
              description: val.description,
              price: val.price,
            });
          });
          setService((prev) => [...prev, ...newArr]);
        })
        .catch((error) => console.log(error));
    } else {
      setIsModalOpen(true);
      getAllForm({ id: id })
        .unwrap()
        .then((payload) => {
          console.log(payload);
          setForm([]);
          let newArr = [];
          payload.data.map((val, index) => {
            newArr.push({
              id: val._id,
              cusName: val.customerId.name,
              cusPhone: val.customerId.phone,
              cusAdd: val.address,
              serName: val.serviceId.type,
              date: val.date.slice(0, 9).split("-").reverse().join("/"),
              price: val.price,
              isPaid: val.isPaid === true ? "Paid" : "Unpaid",
            });
          });
          setForm((prev) => [...prev, ...newArr]);
        })
        .catch((error) => console.log(error));
    }
    // getUser({ id: id })
    //   .unwrap()
    //   .then((payload) => {
    //     console.log(payload);
    //     form.setFieldsValue({
    //       Id: payload.data._id,
    //       Name: payload.data.name,
    //       Email: payload.data.email,
    //       Phone: payload.data.phone,
    //       Status: payload.data.isActive === true ? "Active" : "Inactive",
    //       Role: payload.data.role,
    //     });
    //   });
  };
  const handleClose = () => {
    setIsService(false);
    if (isService) {
      setOpen(false);
    } else {
      setIsModalOpen(false);
    }
  };

  const loadData = () => {
    setData([]);
    getAllUser()
      .unwrap()
      .then((payload) => {
        if (payload.success === true) {
          let newArr = [];
          payload.data.map((val, index) => {
            if (val.role === "company") {
              console.log(val);
              newArr.push({
                id: index,
                garage: val.name,
                garageId: val._id,
              });
            }
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
            if (val.role === "company") {
              newArr.push({
                id: index,
                garage: val.name,
                garageId: val._id,
              });
            }
          });
          setData((prev) => [...prev, ...newArr]);
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
    // await deleteUser({ id: id })
    //   .unwrap()
    //   .then((payload) => {
    //     if (payload.success) {
    //       <Alert severity="success">{payload.message}</Alert>;
    //     }
    //   });
    // setData(data.filter((item) => item.id !== id));
    // loadData();
  };
  const handleEdit = (id) => {
    handleOpen(id);
  };
  const handleViewService = (id) => {
    handleOpen(id);
    setIsService(true);
  };
  const handleViewForm = (id) => {
    handleOpen(id);
  };
  const handleCreate = () => {
    setIsModalOpen(true);
  };
  const createService = () => {};
  const editService = () => {};
  const deleteService = () => {};
  const onSubmit = async (values) => {
    // console.log(values);
    // if (isEdit) {
    //   await updateUser({
    //     id: values.Id,
    //     name: values.Name,
    //     phone: values.Phone,
    //   })
    //     .unwrap()
    //     .then((payload) => {
    //       if (payload.success === true) {
    //         setOpen(false);
    //         notification.open({
    //           message: "Update profile",
    //           description: "Success",
    //         });
    //         loadData();
    //       } else {
    //         notification.open({
    //           message: "Update profile",
    //           description: "False",
    //         });
    //       }
    //     });
    // } else {
    //   await createUser({
    //     name: values.Name,
    //     email: values.Email,
    //     phone: values.Phone,
    //     openTime: values.Opentime,
    //     closeTime: values.Closetime,
    //     long: Number(values.Longitude),
    //     lat: Number(values.Latitude),
    //     address: values.Address,
    //   })
    //     .unwrap()
    //     .then((payload) => {
    //       alert(payload.message);
    //       setIsModalOpen(false);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       alert(error.data.message.duplicate);
    //     });
    // }
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 500,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => handleViewService(params.row.garageId)}
            >
              View Service
            </div>
            <div
              className="viewButton"
              onClick={() => handleViewForm(params.row.garageId)}
            >
              View Order Form
            </div>

            <div
              className="editButton"
              onClick={() => handleEdit(params.row.id)}
            >
              Update Detail
            </div>
          </div>
        );
      },
    },
  ];
  const actionColumn2 = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => createService(params.row.id)}
            >
              View
            </div>
            <div
              className="deleteButton"
              onClick={() => deleteService(params.row.id)}
            >
              Delete
            </div>

            <div
              className="editButton"
              onClick={() => editService(params.row.id)}
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
      <DataGrid
        className="datagrid"
        rows={data}
        columns={serviceColumns.concat(actionColumn)}
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
            <DataGrid
              // getRowHeight={() => "auto"}
              className="datagrid"
              rows={orderForm}
              columns={formColumn}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableVirtualization
            />
          </Box>
        </Modal>
      </div>
      <Drawer
        title={isService ? "SERVICE" : "ORDER FORM"}
        width={900}
        onClose={handleClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
          marginTop: 50,
        }}
      >
        <DataGrid
          className="datagrid"
          rows={service}
          columns={serviceColumns2.concat(actionColumn2)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          disableVirtualization
        />
        {/* <Form
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
        </Form> */}
      </Drawer>
    </div>
  );
};

export default Datatable;
