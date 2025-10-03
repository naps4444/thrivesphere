"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const GridAnimation = () => {
  const gridRef = useRef(null);
  const rowsRef = useRef([]);
  const cellsRef = useRef([]);

  const x_max = 11;
  const y_max = 11;
  const pull_distance = 50;
  let clicked = false;
  let reset_all = false;

  useEffect(() => {
    const grid = gridRef.current;
    rowsRef.current = [];
    cellsRef.current = [];

    // Clear any previous children
    grid.innerHTML = "";

    // Create grid
    for (let x = 0; x < x_max; x++) {
      const row = document.createElement("div");
      row.className = "row";
      for (let y = 0; y < y_max; y++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.x = x;
        cell.dataset.y = y;
        row.appendChild(cell);
        cellsRef.current.push(cell);
      }
      grid.appendChild(row);
      rowsRef.current.push(row);
    }

    // Update cell center positions
    const updateCellPositions = () => {
      cellsRef.current.forEach((cell) => {
        const rect = cell.getBoundingClientRect();
        cell.center_position = {
          x: (rect.left + rect.right) / 2,
          y: (rect.top + rect.bottom) / 2,
        };
      });
    };

    // Pointer movement effect
    const handlePointerMove = (e = { pageX: -pull_distance, pageY: -pull_distance }) => {
      if (clicked) return;

      const pointer_x = e.pageX;
      const pointer_y = e.pageY;

      cellsRef.current.forEach((cell) => {
        const diff_x = pointer_x - cell.center_position.x;
        const diff_y = pointer_y - cell.center_position.y;
        const distance = Math.sqrt(diff_x ** 2 + diff_y ** 2);

        if (distance < pull_distance) {
          const percent = distance / pull_distance;
          cell.pulled = true;
          gsap.to(cell, {
            duration: 0.2,
            x: diff_x * percent,
            y: diff_y * percent,
          });
        } else if (cell.pulled) {
          cell.pulled = false;
          gsap.to(cell, {
            duration: 1,
            x: 0,
            y: 0,
            ease: "elastic.out(1, 0.3)",
          });
        }
      });

      if (reset_all) {
        reset_all = false;
        gsap.to(cellsRef.current, {
          duration: 1,
          x: 0,
          y: 0,
          ease: "elastic.out(1, 0.3)",
        });
      }
    };

    // Cell click animation
    const handleCellClick = (e, i) => {
      if (clicked) return;
      clicked = true;

      gsap.to(cellsRef.current, {
        duration: 1.6,
        physics2D: {
          velocity: "random(400,1000)",
          angle: "random(250,290)",
          gravity: 2000,
        },
        stagger: {
          grid: [rowsRef.current.length, rowsRef.current[0].children.length],
          from: i,
          amount: 0.3,
        },
        onComplete: function () {
          this.timeScale(-1.3);
        },
        onReverseComplete: () => {
          clicked = false;
          reset_all = true;
          handlePointerMove();
        },
      });
    };

    updateCellPositions();
    window.addEventListener("resize", updateCellPositions);
    window.addEventListener("pointermove", handlePointerMove);
    document.body.addEventListener("pointerleave", () => handlePointerMove());

    cellsRef.current.forEach((cell, i) =>
      cell.addEventListener("pointerup", (e) => handleCellClick(e, i))
    );

    return () => {
      window.removeEventListener("resize", updateCellPositions);
      window.removeEventListener("pointermove", handlePointerMove);
      document.body.removeEventListener("pointerleave", handlePointerMove);
    };
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        justifyContent: "center",
        alignItems: "center",
        width: "80vw", // 80% of screen width
        height: "80vh", // 80% of screen height
        backgroundColor: "#ffffff",
        overflow: "hidden",
        userSelect: "none",
        margin: "0 auto",
      }}
    />
  );
};

export default GridAnimation;
