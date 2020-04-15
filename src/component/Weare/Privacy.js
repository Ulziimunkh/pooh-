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
export default function Privacy() {
  const classes = useStyles();
  return (
    <>
      <NavBar></NavBar>
      <div className={classes.root}>
        <Paper elevation={3} className={classes.paper}>
          <h2 className={classes.title}> PRIVACY POLICY</h2>

          <p className={classes.para}>
            <em>Last Updated: April 15, 2020</em>
          </p>
          <article>
            <p className={classes.para}>
              {" "}
              We created this Privacy Policy to demonstrate our firm commitment
              to your privacy. This Privacy Policy explains our practices with
              respect to the collection, use, and disclosure of personal and
              non-personal information provided by visitors to our Site. By
              using this site, you signify your assent to these our privacy
              practices and the terms and conditions of our Site.
            </p>
            <br />
            <b>
              If this policy is not agreeable to you, please do not use this
              site.
            </b>
            <h3 className={classes.subTitle}>
              WHAT TYPE INFORMATION IS COLLECTED?
            </h3>
            <p className={classes.para}>
              <b>Personal Information</b> <br /> We only collect personal
              information from visitors to our Site when they voluntarily
              provide it to us by completing our registration form or electing
              to use one of our services. We may require visitors to provide us
              with additional information to verify their identity to assist in
              the event of a lost username or password (such as mother's maiden
              name). Credit Card information is not stored or collected by us;
              rather this information is collected by the payment processing
              company identified on the join page and transmitted via Secure
              Socket Layer technology. Your credit card information is NEVER
              known to us and cannot be shared by us. <br />
              <br />
              <b>Non-Personal Information</b> <br />
              When visitors access our Site, certain non-personal information
              may be collected from them including, but not limited to, their
              browser type (e.g., Chrome or Internet Explorer), operating system
              (e.g., Windows or Macintosh), IP address, and the domain name from
              which they accessed the site (e.g., Google). In addition, we may
              collect information about visitors' browsing behavior, such as the
              date and time they visit the Site, the areas or pages of our Site
              that they visit, the amount of time spent viewing the site, the
              number of times the visitor returns to the site, and click-stream
              data. We use transparent tracking pixels to determine the number
              of Site visitors that have been sent to us through our affiliate
              network. We do not track any information about visitors once they
              leave our site. We may use cookies (small text files that are
              stored on visitor’s computers when they access our Site) to
              collect this information. Information collected through cookies
              may be combined with visitors' personal information. We may also
              allow unaffiliated third parties, such as advertisers, to serve
              cookies to visitors of our Site. Visitors are always free to
              decline cookies, but in doing so they may not be able to use
              certain features on our Site. The "help" segment of the toolbar on
              most browsers explains how to configure a browser to not accept
              new cookies, how to have the browser inform a user when they
              receive a new cookie, and how to erase cookies from their hard
              drives.
            </p>
            <h3 className={classes.subTitle}>
              HOW DO WE USE YOUR PERSONAL AND NON-PERSONAL INFORMATION?
            </h3>
            <p className={classes.para}>
              Our goal in collecting personal information is to provide visitors
              with the most personalized Web experience possible and our
              advertisers with an efficient means to reach the right audience.
              By knowing a little about our visitors, we can deliver more
              relevant content and advertisements, and provide better services.
              We may use information collected from visitors to our Site for any
              of the following purposes: (1) to send visitors information and
              promotional materials about our company, (2) to send visitors
              information and promotional materials from our marketing partners
              and third parties (such as advertisers on our Site), (3) to
              deliver targeted display advertisements and offers by email (by
              matching criteria provided by our advertisers with information
              collected from our visitors), (4) to contact visitors to our Site
              when necessary, (5) to allow one-click purchases or access to
              proprietary content by pre-populating fields, within registration
              or other transaction screens, with a visitor's name, billing
              address, and credit or charge card information (among other
              things), as provided by that visitor, (6) to help diagnose
              problems with our server, (7) to administer our Site, (8) to
              conduct internal reviews of our site (e.g., to determine the
              number of visitors to the site), (9) to help us better understand
              visitors' use of our site, and (10) to protect the security or
              integrity of our site. Non-personal information will be used for
              purposes of conducting internal reviews of the site, monitoring
              the site, and providing a greater online experience for our
              visitors.
            </p>
            <h3 className={classes.subTitle}>
              DO WE DISCLOSE YOUR INFORMATION?
            </h3>
            <p className={classes.para}>
              We may transfer or disclose information collected from visitors to
              our Site to our employees and independent contractors, to our
              parent company, subsidiaries and affiliates, and to our
              consultants, other business associates, and suppliers, if the
              disclosure will enable that party to perform a business,
              professional, or technical support function for us, or if required
              to do so by law. We may also disclose information we collect from
              our site visitors to our marketing and business partners, who may
              use the information about their business operations, such as to
              send marketing and other communications to visitors of our site.
              We may also share, rent, sell, or transfer any personal
              information (including financial information) provided by our
              visitors to third parties. During the registration process, and at
              certain times during any member user session, we may present
              additional offers from third party service providers. Our
              third-party service providers have their own terms and conditions
              and privacy policies. We suggest that visitors access these
              third-party sites and review their terms and conditions and
              privacy policies before "subscribing" to any third-party offer. If
              a visitor subscribes to a third party offer during our
              registration process, we will transfer the financial data they
              provided to us as part of the registration process to that
              third-party company, which will then process the transaction using
              that financial data. We may also share non-personal information we
              collect from visitors to our site, such as their browsing
              behaviors, with third parties. For example, we may tell a
              third-party advertiser that a certain number of people have
              visited a certain area on our Site.
            </p>
            <h3 className={classes.subTitle}>
              WHAT SECURITY MEASURES DO WE TAKE TO PROTECT YOUR DATA?
            </h3>
            <p className={classes.para}>
              To help prevent unauthorized access, maintain data integrity, and
              ensure the appropriate use of information, we have put in place
              certain physical, electronic, and managerial procedures to
              safeguard and secure the information we collect from visitors to
              our Site. SSL (Secure Socket Layer) technology protects any credit
              card information you provide. We allow access to personal
              information only to persons and entities engaging in activities
              provided for by this Privacy Policy. Visitors should consider any
              communication that they transmit to us (such as data, questions or
              answers, comments, suggestions, or communications submitted to a
              chat room) to be non-confidential. We will not be liable or
              responsible if information that belongs to a visitor is
              intercepted and used by an unintended recipient.
            </p>
            <h3 className={classes.subTitle}>WE PROTECT CHILDREN'S PRIVACY</h3>
            <p className={classes.para}>
              Protecting the privacy of children is VERY important to us. For
              that reason, we do not structure any part of our site to attract
              anyone under the age of 18 (21 in some areas) and we do not allow
              anyone under the age of 18 (21 in some areas) to register and
              become a member of our site.
            </p>
            <h3 className={classes.subTitle}>CORPORATE CHANGES</h3>
            <p className={classes.para}>
              In the event of a merger, acquisition, asset or stock sale,
              bankruptcy, or other asset transfer (regardless of legal
              formality), any of our assets may be transferred to a third party,
              including personal information collected from visitors to our
              Site.
            </p>
            <h3 className={classes.subTitle}>
              ACCEPTANCE OF PRIVACY TERMS & CONDITIONS
            </h3>
            <p className={classes.para}>
              By visiting this Site, you are agreeing to the practices described
              in this Privacy Policy. By visiting this site, you also accept,
              without limitation or qualification, all terms and conditions
              concerning the use of this site. We may at any time revise these
              terms and conditions. You are bound by any such revisions and
              should therefore periodically visit this page to review the
              then-current terms and conditions to which you are bound. To the
              extent that any of the third-party sites accessible through our
              Site (such as our advertisers) have different privacy practices
              from those stated in this Privacy Policy, those third-party
              privacy practices govern the collection and use of information you
              provide when visiting those sites. We are not responsible for the
              policies, content, and practices of other companies.
            </p>
            <h3 className={classes.subTitle}>CHANGES TO THIS PRIVACY POLICY</h3>
            <p className={classes.para}>
              There may be times when we need to change the terms of this
              Privacy Policy. To ensure that you are aware of our current
              privacy practices, please bookmark this page and check back often.
            </p>
          </article>
        </Paper>
      </div>
    </>
  );
}
