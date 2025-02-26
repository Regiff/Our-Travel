const Map = () => {
  return (
    <>
      <div style={{ width: "100%" }}>
      <iframe
  src="https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=en&amp;q=Cebu,%20Philippines&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
  width="100%"
  height="300"
  style={{ border: 0 }}  // ✅ FIXED: Now an object
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

      </div>
    </>
  );
};

export default Map;
