import React, { useState } from "react";
import {
  PageTitle,
  SectionDivider,
  InfoTextField,
  HorizontalImageInput,
  ReqEditableDataGrid,
  StatusLabel,
} from "../components/global";
import { NationalityTextField } from "../components/mobilization";
import { FileUploadField } from "../components/contract";
import {
  Box,
  Button,
  Typography,
  TextField,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { COLOR } from "../assets/Color";
import Grid from "@mui/material/Grid2";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router";

const AdminSupplyRequestDetail = () => {
  // const navigate = useNavigate();
  const { id } = useParams();
  const status = "Đang chờ xác nhận"; //Change this to the status of the request
  //"Chấp thuận", "Từ chối", "Đang chờ xác nhận", "Đã ký hợp đồng"

  // useEffect(() => {
  //   fetchRequestInfos(id);
  // },[]);

  const initialValues = {
    requestListFileLink: "",
    compInfo: {
      compName: "",
      compAddress: "",
      compPhoneNumber: "",
      compEmail: "",
      representative: "",
      representativePos: "",
    },

    requestInfo: {
      timeOfDeparture: "",
      departureLocation: "",
      UN_LOCODE_DepartureLocation: "",

      estimatedTimeOfArrival: "",
      arrivalLocation: "",
      UN_LOCODE_ArrivalLocation: "",

      shipImage: "",
      shipIMO: "",
      shipName: "",
      shipNationality: "",
      shipType: "",
    },
  };

  const [loading, setLoading] = useState(false);

  const handleApproveClick = async () => {
    setLoading(true);
    try {
      //Calling API to create a new crew member
      await new Promise((resolve) => setTimeout(resolve, 1000)); //Mock API call

      console.log("Successfully approved request");
    } catch (err) {
      console.log("Error when approving request: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeclineClick = async () => {
    setLoading(true);
    try {
      //Calling API to create a new crew member
      await new Promise((resolve) => setTimeout(resolve, 1000)); //Mock API call

      console.log("Successfully declined request");
    } catch (err) {
      console.log("Error when declining request: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Formik
        validateOnChange={false}
        initialValues={initialValues}
        // validationSchema={mobilizationSchema}
        // onSubmit={handleSaveMobilizationSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <Box m="20px" component="form" onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <PageTitle
                    title="CHI TIẾT YÊU CẦU CUNG ỨNG"
                    subtitle={`Yêu cầu cung ứng của công ty: ${id}`} //Change this to the companyName of them company that made the request
                  />
                  {status === "Chấp thuận" ? (
                    <StatusLabel
                      label="Chấp thuận"
                      color={COLOR.primary_green}
                    />
                  ) : status === "Từ chối" ? (
                    <StatusLabel label="Từ chối" color={COLOR.primary_orange} />
                  ) : status === "Đang chờ xác nhận" ? (
                    <StatusLabel
                      label="Đang chờ xác nhận"
                      color={COLOR.primary_black_placeholder}
                    />
                  ) : (
                    <StatusLabel
                      label="Đã ký hợp đồng"
                      color={COLOR.secondary_gold}
                    />
                  )}
                </Box>
                <Box sx={{ display: "flex", }}>
                  {status === "Đang chờ xác nhận" && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        marginRight: 2,
                        width: "50%",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => handleApproveClick()}
                        disabled={loading}
                        sx={{
                          width: "30%",
                          padding: 1,
                          color: COLOR.primary_white,
                          backgroundColor: COLOR.primary_blue,
                          minWidth: 130,
                          marginRight: 2,
                          marginTop: 2,
                          marginBottom: 2,
                        }}
                      >
                        {loading ? (
                          <CircularProgress
                            size={24}
                            color={COLOR.primary_black}
                          />
                        ) : (
                          <Box sx={{ display: "flex", alignItems: "end" }}>
                            <CheckCircleRoundedIcon
                              sx={{ marginRight: "5px", marginBottom: "1px" }}
                            />
                            <Typography sx={{ fontWeight: 700 }}>
                              Chấp thuận
                            </Typography>
                          </Box>
                        )}
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleDeclineClick()}
                        disabled={loading}
                        sx={{
                          width: "30%",
                          padding: 1,
                          color: COLOR.primary_white,
                          backgroundColor: COLOR.primary_orange,
                          minWidth: 130,
                          marginTop: 2,
                          marginBottom: 2,
                        }}
                      >
                        {loading ? (
                          <CircularProgress
                            size={24}
                            color={COLOR.primary_black}
                          />
                        ) : (
                          <Box sx={{ display: "flex", alignItems: "end" }}>
                            <CancelRoundedIcon
                              sx={{ marginRight: "5px", marginBottom: "1px" }}
                            />
                            <Typography sx={{ fontWeight: 700 }}>
                              Từ chối
                            </Typography>
                          </Box>
                        )}
                      </Button>
                    </Box>
                  )}
                  <FileUploadField label="Danh sách số lượng cần cung ứng" disabled={true} name="requestListFileLink" />
                </Box>
              </Box>
            </Box>
            <SectionDivider sectionName="Thông tin công ty: " />
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}>
              <Grid size={4}>
                <InfoTextField
                  id="company-name"
                  label="Tên công ty"
                  size="small"
                  margin="none"
                  disabled={true}
                  required
                  fullWidth
                  name="compInfo.compName"
                  value={values.compInfo?.compName}
                  error={
                    !!touched.compInfo?.compName && !!errors.compInfo?.compName
                  }
                  helperText={
                    touched.compInfo?.compName && errors.compInfo?.compName
                      ? errors.compInfo?.compName
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                />
              </Grid>
              <Grid size={5}>
                <InfoTextField
                  id="company-address"
                  label="Địa chỉ"
                  size="small"
                  margin="none"
                  disabled={true}
                  required
                  fullWidth
                  name="compInfo.compAddress"
                  value={values.compInfo?.compAddress}
                  error={
                    !!touched.compInfo?.compAddress &&
                    !!errors.compInfo?.compAddress
                  }
                  helperText={
                    touched.compInfo?.compAddress &&
                    errors.compInfo?.compAddress
                      ? errors.compInfo?.compAddress
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                />
              </Grid>
              <Grid size={3}>
                <InfoTextField
                  id="company-phone-number"
                  label="Số điện thoại"
                  size="small"
                  margin="none"
                  disabled={true}
                  required
                  fullWidth
                  name="compInfo.compPhoneNumber"
                  value={values.compInfo?.compPhoneNumber}
                  error={
                    !!touched.compInfo?.compPhoneNumber &&
                    !!errors.compInfo?.compPhoneNumber
                  }
                  helperText={
                    touched.compInfo?.compPhoneNumber &&
                    errors.compInfo?.compPhoneNumber
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                />
              </Grid>
              <Grid size={4}>
                <InfoTextField
                  id="email"
                  label="Email"
                  size="small"
                  margin="none"
                  disabled={true}
                  required
                  fullWidth
                  name="compInfo.compEmail"
                  value={values.compInfo?.compEmail}
                  error={
                    !!touched.compInfo?.compEmail &&
                    !!errors.compInfo?.compEmail
                  }
                  helperText={
                    touched.compInfo?.compEmail && errors.compInfo?.compEmail
                      ? errors.compInfo?.compEmail
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                />
              </Grid>
              <Grid size={5}>
                <InfoTextField
                  id="representative"
                  label="Người đại diện"
                  size="small"
                  margin="none"
                  disabled={true}
                  required
                  fullWidth
                  name="compInfo.representative"
                  value={values.compInfo?.representative}
                  error={
                    !!touched.compInfo?.representative &&
                    !!errors.compInfo?.representative
                  }
                  helperText={
                    touched.compInfo?.representative &&
                    errors.compInfo?.representative
                      ? errors.compInfo?.representative
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                />
              </Grid>
              <Grid size={3}>
                <InfoTextField
                  id="representative-position"
                  label="Chức vụ"
                  size="small"
                  margin="none"
                  disabled={true}
                  required
                  fullWidth
                  name="compInfo.representativePos"
                  value={values.compInfo?.representativePos}
                  error={
                    !!touched.compInfo?.representativePos &&
                    !!errors.compInfo?.representativePos
                  }
                  helperText={
                    touched.compInfo?.representativePos &&
                    errors.compInfo?.representativePos
                      ? errors.compInfo?.representativePos
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                />
              </Grid>
            </Grid>
            <SectionDivider sectionName="Thông tin Tàu và Lịch trình*: " />
            <Typography
              sx={{
                ml: 2,
                fontSize: 18,
                textDecoration: "underline",
                fontStyle: "italic",
                color: COLOR.primary_black_placeholder,
              }}
            >
              Lịch trình dự kiến:
            </Typography>
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}>
              <Grid size={4}>
                <InfoTextField
                  id="time-of-departure"
                  type="datetime-local"
                  required
                  label="Thời gian khởi hành dự kiến"
                  size="small"
                  margin="none"
                  disabled={true}
                  fullWidth
                  name="requestInfo.timeOfDeparture"
                  value={values.requestInfo?.timeOfDeparture}
                  error={
                    !!touched.requestInfo?.timeOfDeparture &&
                    !!errors.requestInfo?.timeOfDeparture
                  }
                  helperText={
                    touched.requestInfo?.timeOfDeparture &&
                    errors.requestInfo?.timeOfDeparture
                      ? errors.requestInfo?.timeOfDeparture
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={2}>
                <InfoTextField
                  id="arrival-location"
                  label="UN/LOCODE điểm khởi hành"
                  required
                  size="small"
                  margin="none"
                  disabled={true}
                  fullWidth
                  name="requestInfo.UN_LOCODE_DepartureLocation"
                  value={values.requestInfo?.UN_LOCODE_DepartureLocation}
                  error={
                    !!touched.requestInfo?.UN_LOCODE_DepartureLocation &&
                    !!errors.requestInfo?.UN_LOCODE_DepartureLocation
                  }
                  helperText={
                    touched.requestInfo?.UN_LOCODE_DepartureLocation &&
                    errors.requestInfo?.UN_LOCODE_DepartureLocation
                      ? errors.requestInfo?.UN_LOCODE_DepartureLocation
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                />
              </Grid>
              <Grid size={6}>
                <InfoTextField
                  id="departure-location"
                  label="Tên điểm khởi hành"
                  required
                  size="small"
                  margin="none"
                  disabled={true}
                  fullWidth
                  name="requestInfo.departureLocation"
                  value={values.requestInfo?.departureLocation}
                  error={
                    !!touched.requestInfo?.departureLocation &&
                    !!errors.requestInfo?.departureLocation
                  }
                  helperText={
                    touched.requestInfo?.departureLocation &&
                    errors.requestInfo?.departureLocation
                      ? errors.requestInfo?.departureLocation
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                />
              </Grid>
              <Grid size={4}>
                <InfoTextField
                  id="estimated-time-of-arrival"
                  type="datetime-local"
                  required
                  label="Thời gian đến nơi dự kiến"
                  size="small"
                  margin="none"
                  disabled={true}
                  fullWidth
                  name="requestInfo.estimatedTimeOfArrival"
                  value={values.requestInfo?.estimatedTimeOfArrival}
                  error={
                    !!touched.requestInfo?.estimatedTimeOfArrival &&
                    !!errors.requestInfo?.estimatedTimeOfArrival
                  }
                  helperText={
                    touched.requestInfo?.estimatedTimeOfArrival &&
                    errors.requestInfo?.estimatedTimeOfArrival
                      ? errors.requestInfo?.estimatedTimeOfArrival
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={2}>
                <InfoTextField
                  id="arrival-location"
                  label="UN/LOCODE điểm đến"
                  required
                  size="small"
                  margin="none"
                  disabled={true}
                  fullWidth
                  name="requestInfo.UN_LOCODE_ArrivalLocation"
                  value={values.requestInfo?.UN_LOCODE_ArrivalLocation}
                  error={
                    !!touched.requestInfo?.UN_LOCODE_ArrivalLocation &&
                    !!errors.requestInfo?.UN_LOCODE_ArrivalLocation
                  }
                  helperText={
                    touched.requestInfo?.UN_LOCODE_ArrivalLocation &&
                    errors.requestInfo?.UN_LOCODE_ArrivalLocation
                      ? errors.requestInfo?.UN_LOCODE_ArrivalLocation
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                />
              </Grid>
              <Grid size={6}>
                <InfoTextField
                  id="arrival-location"
                  label="Tên điểm đến"
                  required
                  size="small"
                  margin="none"
                  disabled={true}
                  fullWidth
                  name="requestInfo.arrivalLocation"
                  value={values.requestInfo?.arrivalLocation}
                  error={
                    !!touched.requestInfo?.arrivalLocation &&
                    !!errors.requestInfo?.arrivalLocation
                  }
                  helperText={
                    touched.requestInfo?.arrivalLocation &&
                    errors.requestInfo?.arrivalLocation
                      ? errors.requestInfo?.arrivalLocation
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Typography
              sx={{
                ml: 2,
                fontSize: 18,
                textDecoration: "underline",
                fontStyle: "italic",
                color: COLOR.primary_black_placeholder,
              }}
            >
              Thông tin Tàu:
            </Typography>
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}>
              <Grid
                size={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <HorizontalImageInput
                  id="social-ins-image"
                  disabled={true}
                  width={300}
                  height={180}
                  name="requestInfo.shipImage"
                  sx={{ marginBottom: 2 }}
                  onClick={() =>
                    document.getElementById("social-ins-image").click()
                  }
                />
              </Grid>
              <Grid size={2}>
                <InfoTextField
                  id="ship-imo"
                  label="IMO"
                  size="small"
                  margin="none"
                  disabled={true}
                  fullWidth
                  name="requestInfo.shipIMO"
                  value={values.requestInfo?.shipIMO}
                  error={
                    !!touched.requestInfo?.shipIMO &&
                    !!errors.requestInfo?.shipIMO
                  }
                  helperText={
                    touched.requestInfo?.shipIMO && errors.requestInfo?.shipIMO
                      ? errors.requestInfo?.shipIMO
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                />
              </Grid>
              <Grid size={4}>
                <InfoTextField
                  id="ship-name"
                  label="Tên tàu"
                  size="small"
                  margin="none"
                  disabled={true}
                  fullWidth
                  name="requestInfo.shipName"
                  value={values.requestInfo?.shipName}
                  error={
                    !!touched.requestInfo?.shipName &&
                    !!errors.requestInfo?.shipName
                  }
                  helperText={
                    touched.requestInfo?.shipName &&
                    errors.requestInfo?.shipName
                      ? errors.requestInfo?.shipName
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                />
              </Grid>
              <Grid size={2}>
                <NationalityTextField
                  id="ship-nationality"
                  label="Quốc tịch"
                  size="small"
                  margin="none"
                  disabled={true}
                  fullWidth
                  name="requestInfo.shipNationality"
                  value={values.requestInfo?.shipNationality}
                  error={
                    !!touched.requestInfo?.shipNationality &&
                    !!errors.requestInfo?.shipNationality
                  }
                  helperText={
                    touched.requestInfo?.shipNationality &&
                    errors.requestInfo?.shipNationality
                      ? errors.requestInfo?.shipNationality
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                />
              </Grid>
              <Grid size={4}>
                <InfoTextField
                  id="ship-type"
                  label="Loại tàu"
                  size="small"
                  margin="none"
                  disabled={true}
                  fullWidth
                  name="requestInfo.shipType"
                  value={values.requestInfo?.shipType}
                  error={
                    !!touched.requestInfo?.shipType &&
                    !!errors.requestInfo?.shipType
                  }
                  helperText={
                    touched.requestInfo?.shipType &&
                    errors.requestInfo?.shipType
                      ? errors.requestInfo?.shipType
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default AdminSupplyRequestDetail;
