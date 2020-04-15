import React from "react";
import NavBar from "../NavBar/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    margin: "0 16px",
  },
  paper: {
    padding: "20px",
  },
  title: {
    textAlign: "center",
    paddingTop: "10px",
    borderBottom: "1px solid orange",
    display: "inline",
  },
  subTitle: {
    marginTop: "20px",
  },
  para: {
    marginTop: "15px",
  },
}));
export default function Term() {
  const classes = useStyles();
  return (
    <>
      <NavBar></NavBar>
      <div className={classes.root}>
        <Paper elevation={3} className={classes.paper}>
          <h2 className={classes.title}>
            {" "}
            TERMS OF SERVICE / USER AGREEMENT / DISCLAIMER
          </h2>

          <p className={classes.para}>
            <em>Last Updated: April 15, 2020</em>
          </p>
          <article>
            <p className={classes.para}>
              {" "}
              This website and its component services (referred to herein as
              "Site" or "Service") are presented to you on the terms and
              conditions set forth below by mangochat.com ("Company" or "We").
              By accessing or using this Service, you ("You") agree to each and
              every term and condition stated below, and as may be revised from
              time to time. By accessing or using this Site or Service, you
              hereby state and affirm that You have read, understood in full,
              and agree with all of the following terms of service ("Agreement"
              or "TOS"):
            </p>
            <br />
            <h3 className={classes.subTitle}>
              1. PRE-CONDITIONS FOR ACCESS TO SITE OR USE OF THE SERVICE
            </h3>
            <p className={classes.para}>
              You must be of legal age to enter into binding agreements (such as
              this), meaning you must be at least 16 years of age (18 or 21 in
              some jurisdictions). This Site may contain images, language and
              sounds that are sexually erotic in nature. By accessing or using
              this Service, You represent and warrant that you are not offended
              by images of nudity, sexually charged language, and that You
              choose to be exposed to same herein. If you have a person under
              the age of majority in your household or who might otherwise gain
              access to this Site via your computer, the Company strongly
              encourages you to install filtering software to prevent access to
              this Site by a minor or a person who may be offended by its
              content. You represent and warrant that you will not allow a minor
              access to this Site. In accordance with 47 U.S.C. §230(d), You are
              hereby informed that You may research online safety filters at
              websites such as: http://www.getnetwise.org or
              http://www.child-internet-safety.com/internet_filters.php, among
              others. We do not make any warranty or representation regarding
              these products so We highly recommend You conduct responsible due
              diligence before installing or purchasing any online filter.
              Further, We cannot and will not provide technical support for
              these products. By using the Service, You expressly authorize the
              Company to communicate with you via electronic messaging, to the
              email address you have provided, regarding the Service, Service
              updates or information pertaining to the Service or your
              subscription.
            </p>
            <h3 className={classes.subTitle}>
              2.MEMBER INTERACTIONS / SAFETY / RELEASE
            </h3>
            <p className={classes.para}>
              By accessing or using the Service, You represent and warrant that
              you are not required to register as a sex offender with any
              government entity. THIS SERVICE DOES NOT CONDUCT CRIMINAL
              BACKGROUND SCREENINGS ON ITS MEMBERS. You agree that You are
              solely responsible for Your interactions with other users, both on
              and off the Site. Use common sense and caution when interacting
              with other users of the Service. You are strongly encouraged to
              request proof of age and identity prior to embarking on a
              relationship or outing with another user or member. Company does
              not guarantee the authenticity of any member profile. You release
              the Company, its managers, officers, directors, employees and
              agents from all claims, liabilities and demands, of any kind or
              nature whatsoever, known or unknown, suspected or unsuspected,
              arising out of or related to Your use of the Service or Your
              interactions with any person or profile through, at or in
              connection with the Site, including but not limited to
              interactions with Fantasy Dates. Under no circumstance will
              Company be liable for any damages whatsoever, whether direct,
              indirect, general, special, compensatory, consequential, and/or
              incidental, arising out of or relating to the conduct of You or
              anyone else in connection with the use of the Service including,
              but not limited to, bodily injury, emotional distress, and/or any
              other damages resulting from communications or meetings with other
              users, members or profiles, including but not limited to Fantasy
              Dates.
            </p>
          </article>
        </Paper>
      </div>
    </>
  );
}
