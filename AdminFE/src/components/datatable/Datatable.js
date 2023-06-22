import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useGetAllUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserDetailQuery,
} from "../../services/User";
import {
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Alert,
} from "@mui/material";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [tab, settab] = useState(10);
  const getAllUser = useGetAllUserQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const navigate = useNavigate();
  const loadData = () => {
    let newArr = [];
    getAllUser.data.data.map((val, index) => {
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
  };
  useEffect(() => {
    setData([]);
    if (getAllUser.status === "fulfilled") {
      let newArr = [];
      getAllUser.data.data.map((val, index) => {
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
    if (getAllUser.error) {
      <Alert severity="error">
        {getAllUser.error.data.message}...Please login again !
      </Alert>;
      localStorage.clear();
      navigate("/login");
    }
  }, []);
  const handleDelete = async (id) => {
    console.log(id);
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
    // setData(data.filter((item) => item.id !== id));
  };
  const handleView = (id) => {
    // setData(data.filter((item) => item.id !== id));
  };
  const handleChange = (SelectChangeEvent) => {
    settab(SelectChangeEvent.target.value);
    let newArr = [];
    getAllUser.data.data.map((val, index) => {
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
        <Link to="/users/new" className="link">
          Add New Company
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        disableVirtualization
      />
    </div>
  );
};

export default Datatable;
