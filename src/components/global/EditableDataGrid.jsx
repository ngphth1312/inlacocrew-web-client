import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
// import { mockCrewMemberInfos } from "../../data/mockData";
import { COLOR } from "../../assets/Color";
import { NoValuesOverlay } from "../global";
import { useField, useFormikContext } from "formik";

// function replacePositionName(arr) {
//   return arr.map((item) => {
//     if (item.position && item.position.name) {
//       item.positionName = item.position.name;
//       delete item.position;
//     }
//     return item;
//   });
// }

// const initialRows = replacePositionName(mockCrewMemberInfos);

function randomID() {
  return Math.random().toString(36).substring(2, 12);
}

export default function EditableDataGrid({ name, sx = [], ...props }) {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [isEditable, setIsEditable] = useState(true);

  const { setFieldValue } = useFormikContext();
  // const [field, meta] = useField(name);

    const handleEditButtonClick = () => {
      setIsEditable(true);
    };

    const handleSaveButtonClick = () => {
      console.log(rows);
      setIsEditable(false);
      setFieldValue(name, rows);
    };

  const handleAddCrewClick = () => {
    const id = randomID();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        crewID: "",
        fullName: "",
        dob: "",
        phoneNumber: "",
        position: {
          name: "",
        },
        isNew: true,
      },
    ]);

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "crewID" },
    }));
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    console.log(newRow.dob);
    if (newRow.dob) {
      newRow.dob = new Date(newRow.dob).toISOString().split("T")[0]; // Format the date as YYYY-MM-DD
      console.log(newRow.dob);
    }

    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "crewID",
      headerName: "Mã TV",
      flex: 2,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "fullName",
      headerName: "Họ tên",
      flex: 3,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "dob",
      headerName: "Ngày sinh",
      type: "date",
      flex: 2,
      editable: true,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => new Date(params?.value),
    },
    {
      field: "phoneNumber",
      headerName: "SĐT",
      flex: 2,
      align: "left",
      headerAlign: "left",
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "positionName",
      headerName: "Vị trí chuyên môn",
      flex: 3,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Thao tác",
      flex: 2,
      align: "center",
      headerAlign: "center",
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: COLOR.primary_black_placeholder,
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              sx={{ color: COLOR.primary_orange }}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteForeverRoundedIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            sx={{ color: COLOR.primary_orange }}
          />,
        ];
      },
    },
  ];

  return (
    <Box
      {...props}
      sx={[
        {
          width: "100%",
          "& .actions": {
            color: COLOR.primary_black_placeholder,
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: COLOR.secondary_blue,
            color: COLOR.primary_white,
          },
          "& .MuiTablePagination-root": {
            backgroundColor: COLOR.secondary_blue,
            color: COLOR.primary_white,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box sx={{ display: "flex", width: "100%" }}>
        <Button
          variant="contained"
          sx={{
            width: "16%",
            padding: 1,
            color: COLOR.primary_black,
            backgroundColor: COLOR.primary_gold,
            minWidth: 130,
            marginBottom: 2,
            marginRight: 2,
          }}
          onClick={handleAddCrewClick}
          disabled={!isEditable}
        >
          <Box sx={{ display: "flex", alignItems: "end" }}>
            <PersonAddIcon
              sx={{
                width: 20,
                height: 20,
                marginRight: "5px",
                marginBottom: "2px",
              }}
            />
            <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
              Thêm thuyền viên
            </Typography>
          </Box>
        </Button>
        <Button
          variant="contained"
          sx={{
            width: "12%",
            padding: 1,
            color: COLOR.primary_black,
            backgroundColor: isEditable ? COLOR.primary_blue : COLOR.primary_gold,
            minWidth: 130,
            marginBottom: 2,
          }}
          onClick={isEditable ? handleSaveButtonClick : handleEditButtonClick}
        >
          <Box sx={{ display: "flex", alignItems: "end" }}>
            {isEditable ? (
              <SaveIcon
                sx={{
                  width: 20,
                  height: 20,
                  marginRight: "5px",
                  marginBottom: "2px",
                  color: COLOR.primary_white,
                }}
              />
            ) : (
              <PersonAddIcon
                sx={{
                  width: 20,
                  height: 20,
                  marginRight: "5px",
                  marginBottom: "2px",
                }}
              />
            )}
            <Typography sx={{ fontWeight: 700, fontSize: 14, color: isEditable ? COLOR.primary_white : COLOR.primary_black }}>
              {isEditable ? "Lưu" : "Chỉnh sửa"}
            </Typography>
          </Box>
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        disableColumnMenu
        disableRowSelectionOnClick
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        pageSizeOptions={[5, 10, { value: -1, label: "All" }]}
        slots={{ noRowsOverlay: NoValuesOverlay }}
        slotProps={{
          noRowsOverlay: { text: "CHƯA CÓ THUYỀN VIÊN NÀO ĐƯỢC THÊM" },
        }}
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
  );
}
