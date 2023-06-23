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
import {
  useGetCompanyServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useAddServiceMutation,
} from "../../services/Service";
import { useGetAllFormMutation } from "../../services/OrderForm";
const { TextArea } = Input;
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
  const [service, setService] = useState([]);
  const [orderForm, setForm] = useState([]);
  const [getAllUser] = useGetAllUserMutation();
  const [getService] = useGetCompanyServiceMutation();
  const [deleteService] = useDeleteServiceMutation();
  const [getAllForm] = useGetAllFormMutation();
  const [updateService] = useUpdateServiceMutation();
  const [addService] = useAddServiceMutation();
  const [serviceId, setServiceId] = useState("");
  const [isCreate, setIsCreate] = useState(false);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // const handleOpen = (id) => {
  //   if (isService) {
  //     setOpen(true);
  //     getService({ id: id })
  //       .unwrap()
  //       .then((payload) => {
  //         setService([]);
  //         let newArr = [];
  //         payload.data.map((val, index) => {
  //           newArr.push({
  //             id: val._id,
  //             service: val.type,
  //             description: val.description,
  //             price: val.price,
  //           });
  //         });
  //         setService((prev) => [...prev, ...newArr]);
  //       })
  //       .catch((error) => console.log(error));
  //   } else {
  //     setIsModalOpen(true);
  //     getAllForm({ id: id })
  //       .unwrap()
  //       .then((payload) => {
  //         console.log(payload);
  //         setForm([]);
  //         let newArr = [];
  //         payload.data.map((val, index) => {
  //           newArr.push({
  //             id: val._id,
  //             cusName: val.customerId.name,
  //             cusPhone: val.customerId.phone,
  //             cusAdd: val.address,
  //             serName: val.serviceId.type,
  //             date: val.date.slice(0, 9).split("-").reverse().join("/"),
  //             price: val.price,
  //             isPaid: val.isPaid === true ? "Paid" : "Unpaid",
  //           });
  //         });
  //         setForm((prev) => [...prev, ...newArr]);
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // };
  const handleClose = () => {
    setOpen(false);
    setIsModalOpen(false);
    setIsCreate(false);
    form.resetFields();
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

  const handleDelete = (id) => {
    deleteService({ id: id })
      .unwrap()
      .then((payload) => {
        if (payload.success === true) {
          notification.open({
            message: "Delete service",
            description: payload.message,
          });
          handleClose();
        }
      })
      .catch((error) => console.log(error));
  };
  const handleViewService = (id) => {
    setOpen(true);
    getService({ id: id })
      .unwrap()
      .then((payload) => {
        setService([]);
        let newArr = [];
        payload.data.map((val, index) => {
          newArr.push({
            id: val._id,
            garageId: val.accountId,
            service: val.type,
            description: val.description,
            price: val.price,
          });
        });
        form.setFieldsValue({
          GarageId: id,
        });
        setService((prev) => [...prev, ...newArr]);
      })
      .catch((error) => console.log(error));
  };
  const handleViewForm = (id) => {
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
  };

  const createService = () => {
    form.setFieldsValue({
      Id: "",
      Service: "",
      Description: "",
      Price: "",
    });
    setIsCreate(true);
  };

  const viewSevice = (id) => {
    service.map((val) => {
      if (val.id === id[0]) {
        form.setFieldsValue({
          Id: val.id,
          Service: val.service,
          Description: val.description,
          Price: val.price,
        });
      }
    });
  };
  const onSubmit = async (values) => {
    if (isCreate === false) {
      await updateService({
        id: values.Id,
        type: values.Service,
        price: values.Price,
        description: values.Description,
      })
        .unwrap()
        .then(async (payload) => {
          if (payload.success === true) {
            notification.open({
              message: "Update service",
              description: "Success",
            });
            handleClose();
          } else {
            notification.open({
              message: "Update service",
              description: "False",
            });
          }
        })
        .catch((error) => {
          if (error) {
            notification.open({
              message: "Update service",
              description: "False",
            });
          }
        });
    } else {
      await addService({
        id: values.GarageId,
        type: values.Service,
        price: values.Price,
        description: values.Description,
      })
        .unwrap()
        .then((payload) => {
          if (payload.success === true) {
            notification.open({
              message: "Create service",
              description: "Success",
            });
            handleClose();
          } else {
            notification.open({
              message: "Update service",
              description: "False",
            });
          }
        })
        .catch((error) => console.log(error));
    }
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
        title={"SERVICE"}
        width={910}
        onClose={handleClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
          marginTop: 10,
        }}
      >
        <Typography
          style={{ fontSize: 14, fontStyle: "italic", color: "#bbbbbb" }}
        >
          *Click this button to create service*
        </Typography>
        <Button
          onClick={createService}
          style={{
            backgroundColor: "#6439ff",
            color: "white",
            marginBottom: 20,
            width: 220,
          }}
        >
          Create Service
        </Button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DataGrid
            className="datagrid"
            rows={service}
            columns={serviceColumns2}
            pageSize={9}
            rowsPerPageOptions={[9]}
            disableVirtualization
            onRowSelectionModelChange={(item) => {
              viewSevice(item);
              setServiceId(item[0]);
            }}
            disableMultipleSelection={true}
          />
          <Form
            form={form}
            name="form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 30 }}
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            autoComplete="off"
            layout="vertical"
            style={{ marginLeft: 20 }}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Typography
                  style={{
                    color: "#6439ff",
                    fontWeight: "bolder",
                    fontSize: 20,
                    marginBottom: 10,
                  }}
                >
                  Service Detail
                </Typography>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="Id"
                  label="Id"
                  style={{ fontWeight: "bolder" }}
                >
                  <Input
                    style={{
                      border: "1px solid #100444",
                      width: 150,
                      color: "#e7e7e7",
                    }}
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="GarageId"
                  label="GarageId"
                  style={{ fontWeight: "bolder" }}
                >
                  <Input
                    style={{
                      border: "1px solid #100444",
                      width: 140,
                      color: "#e7e7e7",
                    }}
                    readOnly
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="Service"
                  label="Service"
                  style={{ fontWeight: "bolder" }}
                >
                  <Input style={{ border: "1px solid #100444", width: 300 }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="Description"
                  label="Description"
                  style={{ fontWeight: "bolder" }}
                >
                  <TextArea
                    style={{ border: "1px solid #100444", width: 300 }}
                    autoSize={{ minRows: 2, maxRows: 6 }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="Price"
                  label="Price"
                  style={{ fontWeight: "bolder" }}
                >
                  <Input style={{ border: "1px solid #100444", width: 300 }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Button
                  type="primary"
                  htmlType="submit"
                  form="form"
                  style={{
                    textAlign: "center",
                    color: "white",
                    backgroundColor: "#6439ff",
                    width: "100%",
                  }}
                >
                  Submit
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  onClick={() => handleDelete(serviceId)}
                  style={{
                    textAlign: "center",
                    color: "white",
                    backgroundColor: "#6439ff",
                    width: "100%",
                  }}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Drawer>
    </div>
  );
};

export default Datatable;
