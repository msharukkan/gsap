"use client";
import React, {
  useRef,
  useEffect,
  forwardRef,
  useState,
  useCallback,
} from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import styles from "./Puzzle.module.scss";

const terms = [
  "Application Submission",
  "Initial Consultation",
  "Document Collection (KYC)",
  "Application Review",
  "Credit Analysis",
  "Fund Disbursement",
  "Risk Assessment",
  "Property Appraisal",
  "Scrutiny",
  "Due Diligence",
  "Document Signing",
  "Loan Modification",
  "Foreclosure",
  "Regestion STP",
  "Extraction",
  "Fund Disbursement",
  "Initial Consultation",
  "Document Signing",
  "Repayment Monitoring",
  "Credit Scoring",
  "Risk Evaluation",
  "Document Signing",
  "Compliance Check",
  "Documentation Review",
  "Loan Disbursement",
];

const Jigsaw = forwardRef(({ text }, ref) => (
  <div className={styles.jigsaw} ref={ref}>
    <span className={`${styles.top} ${styles.bg}`}></span>
    <span className={`${styles.right} ${styles.bg}`}></span>
    <span className={styles.bottom}></span>
    <span className={styles.left}></span>
    <span className={styles.text}>{text}</span>
  </div>
));

Jigsaw.displayName = 'Jigsaw';

const Puzzle = () => {
  const piecesRef = useRef([]);
  const containerRef = useRef();
  const draggableRef = useRef(null);
  const overlayRef = useRef();
  const [solved, setSolved] = useState(false);
  const [dragCount, setDragCount] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Draggable, ScrollToPlugin);

    // Initialize puzzle pieces with random positions
    piecesRef.current.forEach((piece, index) => {
      const randomX = Math.random() * 200 - 100;
      const randomY = Math.random() * 200 - 100;
      const rotation = Math.random() * 360;
      gsap.set(piece, {
        x: randomX,
        y: randomY,
        zIndex: index + 1,
      });
    });

    draggableRef.current = Draggable.create(piecesRef.current, {
      type: "x,y",

      bounds: containerRef.current,
      onDragEnd: () => setDragCount((prevCount) => prevCount + 1),
    });

    return () => {
      draggableRef.current?.forEach((item) => item.kill()); // Clean up draggable instances
    };
  }, []);

  useEffect(() => {
    if (dragCount >= 7) {
      gsap.to(overlayRef.current, {
        autoAlpha: 1,
        duration: 1,
        zIndex: 1,
      });
      draggableRef.current.forEach((item) => item.disable());
      setDragCount(0);
    }
  }, [dragCount]);

  const solvePuzzle = useCallback(() => {
    const sections = gsap.utils.toArray(`.${styles.panel}`);

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: `.${styles.slider}`,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () =>
          `+=${document.querySelector(`.${styles.slider}`).offsetWidth}`,
      },
    });

    gsap.to(piecesRef.current, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 1,
      onComplete: () => {
        setSolved(true);
        gsap.to(overlayRef.current, {
          autoAlpha: 0,
          duration: 1,
          zIndex: -1,
        });
        setTimeout(() => {
          gsap.to(window, {
            scrollTo: sections[1]?.getBoundingClientRect().x / 2,
            duration: 1,
          });
        }, 1500);
      },
    });
  }, []);

  return (
    <div className={styles.slider}>
      <section className={`${styles.panel}`}>
        <div className={styles.container} ref={containerRef}>
          {terms.map((item, i) => (
            <Jigsaw
              key={i}
              text={item}
              ref={(el) => (piecesRef.current[i] = el)}
            />
          ))}
        </div>
        <div className={styles.overlay} ref={overlayRef}>
          <button
            className={styles.solveButton}
            onClick={solvePuzzle}
            disabled={solved}
          >
            UNCOMPLICATE WITH VUE.AI
          </button>
        </div>
      </section>
      <section className={`${styles.panel} ${styles.fourx4}`}>
        <div className={styles.cards}>
          <h3>
            <span>01</span> Rich, clean data foundation
          </h3>
          <p>
            Vue.ai systems processes and analyzes data from diverse sources,
            including text, images, and text within images, leveraging the power
            of both computer vision and NLP.
          </p>
        </div>
        <div className={styles.cards}>
          <h3>
            <span>02</span> Organized data
          </h3>
          <p>
            The platform is a data powerhouse. It can process massive amounts of
            data, enrich, classify, standardize, and make it dance to the tunes
            of your business for unbeatable results.
          </p>
        </div>
        <div className={styles.cards}>
          <h3>
            <span>03</span> Refine Data
          </h3>
          <p>
            Say no to scattered data. This is your one-stop-shop for all
            customer data.
          </p>
        </div>
        <div className={styles.cards}>
          <h3>
            <span>04</span> Performance Insights
          </h3>
          <p>
            The puzzle solver for data. Vue.ai can fill in missing and
            inconsistent data with substitute values taken from alternate
            sources or through predictive means.
          </p>
        </div>
      </section>
      <section className={`${styles.panel} ${styles.fourx4}`}>
        <div className={styles.cards}>
          <h3>
            <span>01</span> Rich, clean data foundation
          </h3>
          <p>
            Vue.ai systems processes and analyzes data from diverse sources,
            including text, images, and text within images, leveraging the power
            of both computer vision and NLP.
          </p>
        </div>
        <div className={styles.cards}>
          <h3>
            <span>02</span> Organized data
          </h3>
          <p>
            The platform is a data powerhouse. It can process massive amounts of
            data, enrich, classify, standardize, and make it dance to the tunes
            of your business for unbeatable results.
          </p>
        </div>
        <div className={styles.cards}>
          <h3>
            <span>03</span> Refine Data
          </h3>
          <p>
            Say no to scattered data. This is your one-stop-shop for all
            customer data.
          </p>
        </div>
        <div className={styles.cards}>
          <h3>
            <span>04</span> Performance Insights
          </h3>
          <p>
            The puzzle solver for data. Vue.ai can fill in missing and
            inconsistent data with substitute values taken from alternate
            sources or through predictive means.
          </p>
        </div>
      </section>
    </div>
  );
};

Puzzle.displayName = "MyComponent";

export default Puzzle;
