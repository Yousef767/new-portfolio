// import { useState, useEffect } from "react";
export default function Home() {
  // const quotes = [
  //   "I turn ideas into interactive experiences, one line of code at a time.",
  //   "Code is my brush; the browser, my canvas.",
  //   "Pixels with purpose, interfaces with impact.",
  //   "Good design is invisible. Great code makes it feel effortless."
  // ];

  // const [rotation, setRotation] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setRotation((prev) => prev + 1); // 🔥 no modulo
  //   }, 7000);

  //   return () => clearInterval(interval);
  // }, []);


  return (
    <section className="home">
      <div className="homeText">
        <div className="loader-container d-block active" id="loader-container">
          <div className="textRevealContainer">
            <div className="textReveal rotateY">
              <div>
                <div>
                  <h1 className="font-weight-bold mb-0">
                    Yousef Ahmed{" "}
                    <span>
                      <i className="fa-solid fa-terminal"></i>
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p>Front end Developer & Team Leader</p>

    <div className="cube-container">
          <div
            className="cube"
            // style={{
            //   transform: `rotateX(${rotation * -90}deg)`
            // }}
          >
            {/* {quotes.map((quote, i) => (
              <div key={i} className={`face face-${i}`}>
                "Code is my brush; the browser, my canvas."
              </div>
            ))} */}
              <div  className={`face`}>
                "Code is my brush; the browser, my canvas."
              </div>
          </div>
        </div>
        <div className="btns">
          <a href="/cv.pdf" download={true} className="button">
          Download CV <i className="fa-solid fa-cloud-arrow-down"></i>
        </a>
        <a href="/cv.pdf" download={true} className="button">
          Show Projects <i className="fa-solid fa-diagram-project"></i>
        </a>
        </div>


      </div>
      <div className="mouse-icon">
        <MouseIcon />
      </div>
    </section>
  );
}
function MouseIcon() {
  return (
    <svg
      width="19"
      height="30"
      viewBox="0 0 19 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.875 20.625V9.375C16.875 7.38588 16.0848 5.47822 14.6783 4.0717C13.2718 2.66518 11.3641 1.875 9.375 1.875C7.38588 1.875 5.47822 2.66518 4.0717 4.0717C2.66518 5.47822 1.875 7.38588 1.875 9.375V20.625C1.875 22.6141 2.66518 24.5218 4.0717 25.9283C5.47822 27.3348 7.38588 28.125 9.375 28.125C11.3641 28.125 13.2718 27.3348 14.6783 25.9283C16.0848 24.5218 16.875 22.6141 16.875 20.625ZM9.375 0C6.8886 0 4.50403 0.98772 2.74587 2.74587C0.98772 4.50403 0 6.8886 0 9.375V20.625C0 23.1114 0.98772 25.496 2.74587 27.2541C4.50403 29.0123 6.8886 30 9.375 30C11.8614 30 14.246 29.0123 16.0041 27.2541C17.7623 25.496 18.75 23.1114 18.75 20.625V9.375C18.75 6.8886 17.7623 4.50403 16.0041 2.74587C14.246 0.98772 11.8614 0 9.375 0Z"
        fill="#66d9ed"
        className="mouse"
      ></path>
      <path
        d="M10.0379 7.39959C9.8621 7.22377 9.62364 7.125 9.375 7.125C9.12636 7.125 8.8879 7.22377 8.71209 7.39959C8.53627 7.5754 8.4375 7.81386 8.4375 8.0625V11.8125C8.4375 12.0611 8.53627 12.2996 8.71209 12.4754C8.8879 12.6512 9.12636 12.75 9.375 12.75C9.62364 12.75 9.8621 12.6512 10.0379 12.4754C10.2137 12.2996 10.3125 12.0611 10.3125 11.8125V8.0625C10.3125 7.81386 10.2137 7.5754 10.0379 7.39959Z"
        fill="#66d9ed"
        className="cursor"
      ></path>
    </svg>
  );
}
