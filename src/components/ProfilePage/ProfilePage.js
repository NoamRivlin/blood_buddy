import "./ProfilePage.css";
import { Button, Typography } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ProfileEditModal from "../Modals/ProfileEditModal/ProfileEditModal";
import { AppointmentContext } from "../../contexts/AppointmentContext";
import DonateDetailsModal from "../Modals/DonateDetailsModal/DonateDetailsModal";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { AuthContext } from "../../AuthContext";
// TODO: add isConfirmed boolean to profile
// TODO: implement appointment details btn
// TODO: change detail text depending if confirmed or not
// TODO: change profile card text based on firestore data

const ProfilePage = () => {
  const {
    dateString,
    setDateString,
    timeString,
    setTimeString,
    isConfirmed,
    setIsConfirmed,
    confirmedDate,
    setConfirmedDate,
  } = useContext(AppointmentContext);

  const { user } = useContext(AuthContext);

  const [file, setFile] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  // getting document
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    return async () => {
      const docRef = doc(db, "users", user.uid);
      const docUser = await getDoc(docRef);
      console.log(docUser.data(), docUser.id);
      setUserInfo(docUser.data());
      console.log(userInfo);
    };
  }, [isEditOpen]);

  // useEffect(() => {
  //   (async () => {
  //     const docRef = doc(db, "users", user.uid);
  //     const docUser = await getDoc(docRef);
  //     console.log(docUser.data(), docUser.id);
  //     setUserInfo(docUser.data());
  //     console.log(userInfo);
  //   })();
  // }, []);

  // edit modal
  const openEditModal = () => {
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
  };
  // end of edit modal

  // appointment modal
  const closeDetailsModal = () => {
    setIsDetailsOpen(false);
  };

  const openDetailsModal = () => {
    setIsDetailsOpen(true);
  };

  // end of appointment modal

  return (
    <>
      <Navbar />
      <div className="profile-page-page">
        <section className="left-pane">
          <div className="profile-image-container">
            <img
              className="profile__image"
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="profile picture"
            />
            <Button
              variant="contained"
              component="label"
              className="profile__image-button"
            >
              <CameraAltIcon />
              Upload
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>
          </div>
          <Button
            disabled={!isConfirmed}
            onClick={openDetailsModal}
            variant="contained"
            className="profile__appointment-button"
            style={{ margin: "auto" }}
          >
            View nearest appointment details
          </Button>
        </section>
        <section className="right-pane">
          <div className="profile-info">
            <div className="profile-info-box">
              <div className="profile-info-snippet">
                <label className="profile-info__category">First Name: </label>
                <p className="profile-info__output">
                  {userInfo?.firstName || ""}
                </p>
              </div>
              <div className="profile-info-snippet">
                <label className="profile-info__category">Last Name: </label>
                <p className="profile-info__output">
                  {userInfo?.lastName || ""}
                </p>
              </div>
              <div className="profile-info-snippet">
                <label className="profile-info__category">Date of birth:</label>
                <p className="profile-info__output">{userInfo?.dob || ""}</p>
              </div>
              <div className="profile-info-snippet">
                <label className="profile-info__category">Phone number: </label>
                <p className="profile-info__output">{userInfo?.phoneNumber}</p>
              </div>
              <div className="profile-info-snippet">
                <label className="profile-info__category">Blood Type: </label>
                <p className="profile-info__output">
                  {userInfo?.bloodType || ""}
                </p>
              </div>
              <div className="profile-info-snippet">
                <label className="profile-info__category">Location: </label>
                <p className="profile-info__output">Tel-aviv, Israel</p>
              </div>
              <div className="profile-info-snippet">
                <label className="profile-info__category">HMO:</label>
                <p className="profile-info__output">{userInfo?.hmo || ""}</p>
              </div>
            </div>
            <Button
              variant="contained"
              onClick={openEditModal}
              className="profile__edit-btn"
            >
              Edit
            </Button>
          </div>
        </section>
      </div>
      <ProfileEditModal
        onOpenModal={openEditModal}
        onCloseModal={closeEditModal}
        isOpen={isEditOpen}
      />

      <DonateDetailsModal
        isOpen={isDetailsOpen}
        onCloseModal={closeDetailsModal}
        confirmedDate={confirmedDate}
        timeString={timeString}
        onOpenModal={openDetailsModal}
      />
    </>
  );
};

export default ProfilePage;
