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
    padding: "10px 20px",
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
  p: {
    marginTop: "20px",
  },
}));
export default function Aboutus() {
  const classes = useStyles();
  return (
    <>
      <NavBar></NavBar>
      <div className={classes.root}>
        <Paper elevation={3} className={classes.paper}>
          <h2 className={classes.title}> WELCOME TO MANGO CHAT</h2>

          <p className={classes.p}>
            <em>Last Updated: January 22, 2020</em>
          </p>
          <article>
            <h3 className={classes.subTitle}>MANGO IS RANDOM CHAT APPLICATION</h3>
            <br />
            <p classes={classes.p}>
              Our chatting website provides free random chat rooms where you can
              have live chat with single girls and boys. You can meet new people
              in our international world chatrooms & make friends online. Our
              aim is to make your chatting experience as fast, easy and best by
              using our random text chat, as pleasant, fun and successful as
              possible. There are lots of ways to find the strangers online to
              text, chat, meet strangers and Talk to Strangers is a great way to
              connect with people around the world. and best thing is its
              completely anonymous. Chat to random people online to female
              strangers online has never been easier. We have a huge list of
              chatrooms which you can browse to find your best chatting partner.
              This is the best free chat rooms site no downloads and free chat
              app. Our text chat site or talk to strangers app or stranger chat
              app download has online chat rooms using social application
              registration. You are on one of the best free chatting apps with
              strangers & best anonymous chat app. Chat to people online today!
            </p>
            <h3 className={classes.subTitle}>
              Anonymous Chat - You can be whoever you want to be
            </h3>
            <br />
            <p classes={classes.p}>
              Another aspect of internet that can be used positively or
              negatively is you can redefine yourself through it. You can be who
              you always wanted to be or the personality that you coveted to
              have, you can be all that and it can really have positive
              influence on your personality; researches have shown pretending
              for a long time can actually change you. But don’t forget the
              negative aspect of anonymity over the internet; your latest love
              interest might be a 50 year old truck driver pretending. You have
              to be really careful to choose how much you should share with the
              other person. Mind you pretending to be a 25 year old boy, or a
              celebrity or something that you just can’t ever become is not
              right and it is an offence. And this kind of pretence can only
              make you delusional.
            </p>
          </article>
        </Paper>
      </div>
    </>
  );
}
