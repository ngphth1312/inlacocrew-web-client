import React from "react";
import { PageTitle, NoValuesOverlay } from "../components/global";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockSupplyRequest } from "../data/mockData";
import { ScheduleCell, ShipInfoCell } from "../components/mobilization";
import { COLOR } from "../assets/Color";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useNavigate } from "react-router";

const SupplyRequest = () => {
  const navigate = useNavigate();

  const isAdmin = true; //Change this to false to see the user view

  const onRequestDetailClick = (id) => {
    if (isAdmin) {
      navigate(`/supply-requests/${id}/admin`);
    } else {
      navigate(`/supply-requests/${id}/user`);
    }
  };

  const columns = [
    {
      field: "partnerName",
      headerName: "Tên công ty",
      sortable: false,
      flex: 2,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "representInfo",
      headerName: "Thông tin Người đại diện",
      sortable: false,
      flex: 2,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <p style={{ margin: 0, textAlign: "left" }}>
            <strong>Tên: </strong>
            {params.value?.name}
          </p>
          <p style={{ margin: 0, textAlign: "left" }}>
            <strong>Email: </strong>
            {params.value?.email}
          </p>
          <p style={{ margin: 0, textAlign: "left" }}>
            <strong>SĐT: </strong>
            {params.value?.phoneNumber}
          </p>
        </div>
      ),
    },
    {
      field: "shipInfo",
      headerName: "Thông tin Tàu",
      sortable: false,
      flex: 3,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <ShipInfoCell
            IMONumber={params?.value?.IMONumber}
            name={params?.value?.name}
            countryCode={params?.value?.countryCode}
            type={params?.value?.type}
            imageUrl={params?.value?.imageUrl}
          />
        );
      },
    },
    {
      field: "schedule",
      headerName: "Lịch trình",
      sortable: false,
      flex: 2,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <ScheduleCell
            startLocation={params?.row?.startLocation}
            startDate={params?.row?.startDate}
            endLocation={params?.row?.endLocation}
            estimatedEndTime={params?.row?.estimatedEndTime}
          />
        );
      },
    },
    {
      field: "detail",
      headerName: "Chi tiết",
      sortable: false,
      flex: 0.75,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              size="small"
              onClick={() => onRequestDetailClick(params?.id)}
              sx={{
                backgroundColor: COLOR.primary_green,
                color: COLOR.primary_black,
                fontWeight: 700,
                textTransform: "capitalize",
              }}
            >
              <ArrowForwardIosRoundedIcon
                sx={{
                  width: 15,
                  height: 15,
                  marginTop: "4px",
                  marginBottom: "4px",
                }}
              />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Box m="20px">
        <PageTitle
          title="YÊU CẦU CUNG ỨNG"
          subtitle="Danh sách các yêu cầu cung ứng thuyền viên"
        />
        {!isAdmin && (
          <Box sx={{ display: "flex", justify: "end" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: COLOR.primary_gold,
                color: COLOR.primary_black,
                borderRadius: 2,
                margin: 0,
                marginLeft: "auto",
              }}
              onClick={() => navigate("/supply-requests/user/create")}
            >
              <AddCircleRoundedIcon />
              <Typography
                sx={{
                  fontWeight: 700,
                  marginLeft: "4px",
                  textTransform: "capitalize",
                }}
              >
                Gửi yêu cầu cung ứng
              </Typography>
            </Button>
          </Box>
        )}
        <Box
          m="20px 0 0 0"
          height={isAdmin ? "72vh" : "65vh"}
          maxHeight={550}
          maxWidth={1600}
          sx={{
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: COLOR.secondary_blue,
              color: COLOR.primary_white,
            },
            "& .MuiTablePagination-root": {
              backgroundColor: COLOR.secondary_blue,
              color: COLOR.primary_white,
            },
          }}
        >
          <DataGrid
            disableRowSelectionOnClick
            disableColumnMenu
            disableColumnResize
            getRowHeight={() => "auto"}
            rows={mockSupplyRequest}
            columns={columns}
            slots={{ noRowsOverlay: NoValuesOverlay }}
            pageSizeOptions={[5, 10, { value: -1, label: "All" }]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
            sx={{
              backgroundColor: "#FFF",
              headerAlign: "center",
              "& .MuiDataGrid-columnHeaderTitle": {
                fontSize: 16,
                fontWeight: 700,
              },
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default SupplyRequest;
