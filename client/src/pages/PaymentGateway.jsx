import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Flex, Heading, Button, Text, Spinner } from "@radix-ui/themes";
import { QR_URL } from "../constants";
import api from "../api";

export default function PaymentGateway() {
  const { state } = useLocation();               // vehicle + dates
  const nav = useNavigate();
  const [step, setStep] = useState(0);           // 0 = show QR, 1 = "paid"
  const [loading, setLoading] = useState(false);

  if (!state) return nav("/");                   // guard direct access

  const next = async () => {
    if (step === 0) {
      // user “scans” QR → go to confirmation screen
      setStep(1);
      return;
    }

    // step === 1 → commit booking as CONFIRMED
    setLoading(true);
    const { vehicle, startDate, endDate } = state;
    const days =
      (new Date(endDate) - new Date(startDate)) / 86400000 + 1;
    const totalCost = days * vehicle.pricePerDay;

    await api.post("/bookings", {
      vehicleId: vehicle._id,
      startDate,
      endDate,
      totalCost,
      status: "confirmed"
    });

    nav("/bookings");
  };

  return (
    <Flex direction="column" align="center" gap="5" p="6">
      <Heading>Payment Gateway</Heading>

      {step === 0 ? (
        <>
          <img
            src={QR_URL}
            alt="QR"
            width="220"
            height="220"
            style={{ borderRadius: 8 }}
          />
          <Text size="2" color="gray">
            Scan & pay to proceed
          </Text>
        </>
      ) : (
        <Heading size="4">Payment Received 🎉</Heading>
      )}

      <Button onClick={next} disabled={loading}>
        {loading ? <Spinner /> : "Next"}
      </Button>
    </Flex>
  );
}


// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { Flex, Heading, Button, Text, Spinner } from "@radix-ui/themes";
// import { QR_URL } from "../constants";
// import api from "../api";

// export default function PaymentGateway() {
//   const { state } = useLocation();               // vehicle + dates
//   const nav = useNavigate();
//   const [step, setStep] = useState(0);
//   const [loading, setLoading] = useState(false);

//   if (!state) return nav("/");                   // direct access guard

//   const next = () => setStep((s) => s + 1);

//   const finish = async () => {
//     setLoading(true);
//     const { vehicle, startDate, endDate } = state;
//     const days = (new Date(endDate) - new Date(startDate)) / 86400000 + 1;
//     const totalCost = days * vehicle.pricePerDay;

//     await api.post("/bookings", {
//       vehicleId: vehicle._id,
//       startDate,
//       endDate,
//       totalCost,
//       status: "confirmed"
//     });

//     nav("/bookings");
//   };

//   return (
//     <Flex direction="column" align="center" gap="5" p="6">
//       <Heading>Payment Gateway</Heading>

//       {step === 0 && (
//         <>
//           <img src={QR_URL} alt="QR" width="220" height="220" style={{ borderRadius: 8 }} />
//           <Text size="2" color="gray">Scan & pay to proceed</Text>
//           <Button onClick={next}>Next</Button>
//         </>
//       )}

//       {step === 1 && (
//         <>
//           <Heading size="4">Payment Received 🎉</Heading>
//           <Button onClick={finish} disabled={loading}>
//             {loading ? <Spinner /> : "Continue"}
//           </Button>
//         </>
//       )}
//     </Flex>
//   );
// }
