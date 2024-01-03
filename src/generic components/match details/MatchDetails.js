import React, { useEffect, useState } from "react";
import "../../index.css";
import classes from "./matchDetails.module.css";
import * as Yup from "yup";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import MyToaster from "../toaster/MyToaster";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast, { ToastBar } from "react-hot-toast";
import ReserveTicketPage from "../../pages/fan/ReserveTicket/ReserveTicketPage";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const MatchDetails = (props) => {
  const [resp, setResp] = React.useState([]);
  const user = useSelector((state) => state.user);
  const { id } = useParams();
 
  const initialValues = {
    firstTeam: resp?.firstTeam?.name,
    secondTeam: resp?.secondTeam?.name,
    date: resp?.dateTime?.substring(0, 10),
    dateTime: resp?.dateTime?.substring(11, 16),
    referee: resp?.referee?.name,
    firstLinesman: resp?.firstLinesman?.name,
    secondLinesman: resp?.secondLinesman?.name,
    stadium: resp?.stadium?.name,
  };

  function dropDownMenu(option, id) {
    return (
      <option key={id} className={classes.option} value={id}>
        {option}
      </option>
    );
  }

  useEffect(() => {
    async function getMatch() {
      const resp = await axios.get(routes.getMatch + id);
      console.log(resp.data);

      setResp(resp.data);

      return resp.data;
    }
    getMatch();
  }, []);

  // useEffect to get team on the time
  const [dataTime, setdataTime] = useState([]);
  const [time, setTime] = useState([]);
  const [date, setDate] = useState([]);
  const [staff, setStaff] = useState([]);
  const [referees, setReferees] = useState([]);

  // Stadium Getting and Setting
  const [teamData, setTeamData] = useState([]);
  const [stadiumData, setStadiumData] = useState();
  const [refereeData, setrefereeData] = useState([]);
  const [firstLinesmenData, setfirstLinesmenData] = useState([]);
  const [secondLinesmenData, setsecondLinesmenData] = useState([]);
  const [dateTimeData, setdateTimeData] = useState("");

  async function getTeamsData(concatenatedDateTime) {
    const resp = await axios.get(routes.getTeam + concatenatedDateTime);
    return resp.data;
  }

  async function getStadiumData(concatenatedDateTime) {
    const resp = await axios.get(routes.getStadium + concatenatedDateTime);
    return resp.data;
  }

  async function getStaffData(concatenatedDateTime) {
    const resp = await axios.get(routes.getStaff + concatenatedDateTime);
    return resp.data;
  }

  useEffect(() => {
    const concatenatedDateTime = `${date}T${time}:00.000Z`;
    setdateTimeData(concatenatedDateTime);
    (async () => {
      const teamRes = await getTeamsData(concatenatedDateTime);
      setTeamData(teamRes);
      const stadiumRes = await getStadiumData(concatenatedDateTime);
      setStadiumData(stadiumRes);
      const staffRes = await getStaffData(concatenatedDateTime);
      setStaff(staffRes);

      console.log(staffRes);
    })();
  }, [time, date]);

  const validationSchema = Yup.object().shape({
    stadium: Yup.string().required("Please enter a stadium"),
  });

  const onformSubmit = (data) => {
    const sendData = {};
    sendData.stadium = data.stadium;
    sendData.referee = data.referee;
    sendData.firstLinesman = data.firstLinesman;
    sendData.secondLinesman = data.secondLinesman;
    data.dateTime = dateTimeData;
    sendData.dateTime = data.dateTime;
    console.log(sendData);
    async function addMatch() {
      try {
        const res = await axios.put(routes.updateMatch + id, sendData);
        console.log(res);
        toast.success("Match Edited Successfully!");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error);
      }
    }
    addMatch();
  };

  return (
    <div className={classes.container}>
      <h1 className="title">Match Details</h1>
      <div className={classes.body}>
        <div className={classes.leftSec}>
          <MyToaster />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onformSubmit}
            enableReinitialize
          >
            {({ values }) => (
              <Form className={classes.shape}>
                {console.log(values.time)}
                {setTime(values.time)}
                {setDate(values.date)}
                <div className={classes.forminput}>
                  <div className={classes.inputbox}>
                    <label className={classes.label}>Date</label>
                    <Field
                      className={classes.input}
                      type="date"
                      name="date"
                      placeholder="Type here"
                      required
                    />
                  </div>
                  <div className={classes.inputbox}>
                    <label className={classes.label}>Time</label>
                    <Field
                      className={classes.input}
                      type="time"
                      name="time"
                      placeholder="Type here"
                      required
                    />
                  </div>
                  <div className={classes.inputbox}>
                    <label className={classes.label}>First Team</label>
                    <Field
                      className={classes.input}
                      type="text"
                      name="firstTeam"
                      placeholder="Type here"
                      required
                      disabled
                    ></Field>
                  </div>
                  <div className={classes.inputbox}>
                    <label className={classes.label}>Second Team</label>
                    <Field
                      className={classes.input}
                      type="text"
                      name="secondTeam"
                      placeholder="Type here"
                      required
                      disabled
                    ></Field>
                  </div>

                  {date && time ? (
                    <div className={classes.inputbox}>
                      <label className={classes.label}>Stadium</label>
                      <Field
                        as="select"
                        className={classes.input}
                        type="text"
                        name="stadium"
                        placeholder="Type here"
                        required
                      >
                        <option value="zoz">Select Stadium</option>
                        {stadiumData
                          ? stadiumData?.map((g, index) =>
                              dropDownMenu(g.name, g._id)
                            )
                          : null}
                      </Field>
                    </div>
                  ) : (
                    <div className={classes.inputbox}>
                      <label className={classes.label}>Stadium</label>
                      <Field
                        className={classes.input}
                        type="text"
                        name="stadium"
                        placeholder="Type here"
                        required
                        disabled
                      ></Field>
                    </div>
                  )}
                  {date && time ? (
                    <div className={classes.inputbox}>
                      <label className={classes.label}>Referee</label>
                      <Field
                        as="select"
                        className={classes.input}
                        type="text"
                        name="referee"
                        placeholder="Type here"
                        required
                      >
                        <option value="" disabled="disabled">
                          Select Referee
                        </option>
                        {staff
                          ? staff
                              .filter((item) => item.type === "referee")
                              .map((g, index) => dropDownMenu(g.name, g._id))
                          : null}
                      </Field>
                    </div>
                  ) : (
                    <div className={classes.inputbox}>
                      <label className={classes.label}>Referee</label>
                      <Field
                        className={classes.input}
                        type="text"
                        name="referee"
                        placeholder="Type here"
                        required
                        disabled
                      ></Field>
                    </div>
                  )}
                  {date && time ? (
                    <div className={classes.inputbox}>
                      <label className={classes.label}>First Line Man</label>
                      <Field
                        as="select"
                        className={classes.input}
                        type="text"
                        name="firstLinesman"
                        placeholder="Type here"
                        required
                      >
                        <option value="" disabled="disabled">
                          Select First Line Man
                        </option>
                        {staff
                          ? staff
                              .filter((item) => item.type === "linesman")
                              .map((g, index) => dropDownMenu(g.name, g._id))
                          : null}
                      </Field>
                    </div>
                  ) : (
                    <div className={classes.inputbox}>
                      <label className={classes.label}>First Line Man</label>
                      <Field
                        className={classes.input}
                        type="text"
                        name="firstLinesman"
                        placeholder="Type here"
                        required
                        disabled
                      ></Field>
                    </div>
                  )}
                  {date && time ? (
                    <div className={classes.inputbox}>
                      <label className={classes.label}>Second Line Man</label>
                      <Field
                        as="select"
                        className={classes.input}
                        type="text"
                        name="secondLinesman"
                        placeholder="Type here"
                        required
                      >
                        <option value="" disabled="disabled">
                          Select Second Line Man
                        </option>
                        {staff
                          ? staff
                              .filter((item) => item.type === "linesman")
                              .map((g, index) => dropDownMenu(g.name, g._id))
                          : null}
                      </Field>
                    </div>
                  ) : (
                    <div className={classes.inputbox}>
                      <label className={classes.label}>Second Line Man</label>
                      <Field
                        className={classes.input}
                        type="text"
                        name="secondLinesman"
                        placeholder="Type here"
                        required
                        disabled
                      ></Field>
                    </div>
                  )}
                </div>
                <div className={classes.btn}>
                  <button type="submit" className={classes.buttons}>
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className={classes.rightSec}>
          <ReserveTicketPage
            rows={resp?.stadium?.rows}
            columns={resp?.stadium?.seatsPerRow}
            seats={resp?.seats}
            matchId={id}
          />
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
