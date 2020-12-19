import React from "react"
import CookieConsent from "components/cookie-consent"

const CookieQuestion = ({
    cookieName,
    router,
    setCookieAccept,
    cookieAccept,
}) => {
    return (
        <CookieConsent
            cookieAccept={cookieAccept}
            location="bottom"
            flipButtons={true}
            buttonText="Akzeptieren"
            enableDeclineButton={true}
            declineButtonText="Ablehnen"
            cookieName={cookieName}
            onAccept={() => {
                setCookieAccept(true)
                router.push("/")
            }}
            onDecline={() => {
                setCookieAccept(false)
                router.push("/")
            }}
            style={{ background: "#2B373B" }}
            buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
            expires={150}
        >
            Diese Webseite verwendet Cookies.{" "}
        </CookieConsent>
    )
}

export default CookieQuestion
