import { useTheme } from '@mui/material';

type UnauthorizedSvgProps = {
  width?: number | string;
  height?: number | string;
};

export const UnauthorizedSvg = ({ width, height }: UnauthorizedSvgProps) => {
  const theme = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 2800 2800"
      style={{
        width,
        height,
      }}
    >
      <defs>
        <style>{`.cls-1{isolation:isolate;}.cls-2{fill:${
          theme.palette.mode === 'light' ? '#f4f7fa' : '#212121'
        };}.cls-3{fill:#97a6b7;}.cls-4{fill:url(#linear-gradient);}.cls-5{fill:url(#linear-gradient-2);}.cls-6{fill:${
          theme.palette.primary.main
        };}.cls-7{fill:url(#linear-gradient-3);}.cls-15,.cls-8{opacity:0.48;mix-blend-mode:soft-light;}.cls-15,.cls-9{fill:#fff;}.cls-10{fill:url(#linear-gradient-4);}.cls-11{fill:url(#linear-gradient-5);}.cls-12{fill:url(#linear-gradient-6);}.cls-13{fill:url(#linear-gradient-7);}.cls-14,.cls-25,.cls-27,.cls-33{opacity:0.3;}.cls-14,.cls-27,.cls-33{mix-blend-mode:multiply;}.cls-14{fill:url(#linear-gradient-8);}.cls-16{fill:url(#linear-gradient-9);}.cls-17{fill:url(#linear-gradient-10);}.cls-18{fill:${
          theme.palette.primary.dark
        };}.cls-19{fill:${
          theme.palette.primary.light
        };}.cls-20{fill:url(#linear-gradient-11);}.cls-21{fill:url(#linear-gradient-12);}.cls-22{fill:url(#linear-gradient-13);}.cls-23{fill:url(#linear-gradient-14);}.cls-24{fill:url(#linear-gradient-15);}.cls-25{mix-blend-mode:color-burn;}.cls-26{fill:url(#linear-gradient-16);}.cls-28{fill:url(#linear-gradient-17);}.cls-29{fill:url(#linear-gradient-18);}.cls-30{fill:url(#linear-gradient-19);}.cls-31{fill:url(#linear-gradient-20);}.cls-32{fill:url(#linear-gradient-21);}.cls-33{fill:url(#linear-gradient-22);}`}</style>
        <linearGradient
          id="linear-gradient"
          x1="1694.48"
          y1="1809.93"
          x2="1701.37"
          y2="2068.36"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#444b8c" />
          <stop offset="1" stopColor="#26264f" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2"
          x1="1750.74"
          y1="1488.65"
          x2="991.33"
          y2="-1177.5"
          xlinkHref="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-3"
          x1="541.16"
          y1="1705.87"
          x2="2662.08"
          y2="1705.87"
          xlinkHref="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-4"
          x1="1254.84"
          y1="2482.64"
          x2="1089.42"
          y2="2552.11"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#40447e" />
          <stop offset="1" stopColor="#3c3b6b" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-5"
          x1="1033.95"
          y1="1753.57"
          x2="854.43"
          y2="1828.97"
          xlinkHref="#linear-gradient-4"
        />
        <linearGradient
          id="linear-gradient-6"
          x1="260.17"
          y1="1794.39"
          x2="1923.87"
          y2="1794.39"
          xlinkHref="#linear-gradient-4"
        />
        <linearGradient
          id="linear-gradient-7"
          x1="260.17"
          y1="2409.62"
          x2="2614.99"
          y2="2409.62"
          xlinkHref="#linear-gradient-4"
        />
        <linearGradient
          id="linear-gradient-8"
          x1="491.1"
          y1="2390.32"
          x2="2216.46"
          y2="2390.32"
          xlinkHref="#linear-gradient-4"
        />
        <linearGradient
          id="linear-gradient-9"
          x1="2655.41"
          y1="2174.75"
          x2="2328.98"
          y2="1896.29"
          xlinkHref="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-10"
          x1="-1472.07"
          y1="3783.89"
          x2="-226.28"
          y2="3830.23"
          gradientTransform="translate(-1405.41 807.94) rotate(-90)"
          xlinkHref="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-11"
          x1="-2771.56"
          y1="-137.35"
          x2="-2803"
          y2="79.41"
          gradientTransform="matrix(-0.81, -0.59, -0.59, 0.81, -931.69, -821.63)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f36f56" />
          <stop offset="1" stopColor="#ffc444" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-12"
          x1="455.21"
          y1="2754.13"
          x2="494.96"
          y2="2754.13"
          gradientTransform="translate(70.64 -166.89) rotate(-9.66)"
          xlinkHref="#linear-gradient-11"
        />
        <linearGradient
          id="linear-gradient-13"
          x1="532.03"
          y1="2590.36"
          x2="427.8"
          y2="2956.04"
          gradientTransform="translate(70.64 -166.89) rotate(-9.66)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#e38ddd" />
          <stop offset="1" stopColor="#9571f6" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-14"
          x1="929.12"
          y1="2065.08"
          x2="836.89"
          y2="2388.68"
          gradientTransform="translate(-24.68 111.22) rotate(5.38)"
          xlinkHref="#linear-gradient-13"
        />
        <linearGradient
          id="linear-gradient-15"
          x1="786.9"
          y1="2437.07"
          x2="833.8"
          y2="2437.07"
          gradientTransform="translate(-24.68 111.22) rotate(5.38)"
          xlinkHref="#linear-gradient-11"
        />
        <linearGradient
          id="linear-gradient-16"
          x1="749.04"
          y1="2696.19"
          x2="362.15"
          y2="2487.72"
          gradientTransform="translate(70.64 -166.89) rotate(-9.66)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#ab316d" />
          <stop offset="1" stopColor="#792d3d" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-17"
          x1="-61.72"
          y1="2533.2"
          x2="-427.51"
          y2="2913.06"
          gradientTransform="translate(100.51 -309.88) rotate(-17.41)"
          xlinkHref="#linear-gradient-16"
        />
        <linearGradient
          id="linear-gradient-18"
          x1="-2193.96"
          y1="1667.25"
          x2="-2202.18"
          y2="1568.61"
          gradientTransform="matrix(-1, 0.05, 0.05, 1, -1422.22, -31.13)"
          xlinkHref="#linear-gradient"
        />
        <linearGradient
          id="linear-gradient-19"
          x1="874.37"
          y1="1424.25"
          x2="901.46"
          y2="1830.49"
          gradientTransform="matrix(1, 0, 0, 1, 0, 0)"
          xlinkHref="#linear-gradient-11"
        />
        <linearGradient
          id="linear-gradient-20"
          x1="3663.43"
          y1="2226.21"
          x2="3740.96"
          y2="2307.93"
          gradientTransform="matrix(0.97, -0.26, 0.26, 0.97, -3310.29, 265.68)"
          xlinkHref="#linear-gradient-11"
        />
        <linearGradient
          id="linear-gradient-21"
          x1="-2398.56"
          y1="525.8"
          x2="-2432.29"
          y2="758.33"
          gradientTransform="matrix(-1, 0, 0, 1, -1261.73, 0)"
          xlinkHref="#linear-gradient-11"
        />
        <linearGradient
          id="linear-gradient-22"
          x1="-2358.97"
          y1="1613.16"
          x2="-2258.4"
          y2="2136.97"
          gradientTransform="matrix(-1, 0, 0, 1, -1261.73, 0)"
          xlinkHref="#linear-gradient-11"
        />
      </defs>
      <g className="cls-1">
        <g id="Camada_2" data-name="Camada 2">
          <g id="Illustration">
            <circle className="cls-2" cx="1400" cy="1400" r="1400" />
            <path
              className="cls-3"
              d="M1933.6,2059.9a107.53,107.53,0,0,1-71.3-81l-53-262.31-453.37,16.1L1300.13,2006c-7.81,38.27,23.47,76.67,59.49,90.76L1549.3,2171A246.58,246.58,0,0,0,1660.2,2187l400.86-34.29a24.85,24.85,0,0,0,22.48-22c1.37-11.82,9.58-25.09-1.6-28.79Z"
            />
            <path
              className="cls-4"
              d="M1938.09,2044a106.6,106.6,0,0,1-71.23-80l-52.95-259-442.32,15.91-55.74,269.83a79,79,0,0,0,48.84,89.61l189.49,73.28A248.87,248.87,0,0,0,1665,2169.49l400.46-33.86a24.71,24.71,0,0,0,5.62-48.1Z"
            />
            <path
              className="cls-5"
              d="M2662.08,1534.24V358.06c0-24.12-19.87-44.65-44.23-45.63L597.14,231.2c-30.75-1.24-56,20-56,47.22V1578.28Z"
            />
            <path
              className="cls-6"
              d="M2574.27,371.18,654.58,299.56c-28-1-50.92,18.41-50.92,43.24V1474.7c0,25.35,23.43,45.42,52,44.6l1917.78-54.54c22.89-.65,41.57-19.67,41.57-42.28V413C2615,390.81,2596.69,372,2574.27,371.18Z"
            />
            <path
              className="cls-7"
              d="M541.16,1578.28v259.6c0,27.21,25.23,48.41,56,47.11l2020.71-85.43c24.36-1,44.23-21.61,44.23-45.72V1526.7Z"
            />
            <g className="cls-8">
              <path
                className="cls-9"
                d="M2443.22,1382.39c-166-56.06-303.27,58.28-422.57-31.74-134.49-101.5-25.78-296.48-150.19-411.35-172.82-159.58-518.34,87.89-668.4-62.55-103.17-103.43,18.53-269-68.83-443.2-44.42-88.57-127.65-148.95-228.69-190L597.14,231.2c-30.75-1.24-56,20-56,47.22V1837.88c0,27.21,25.23,48.41,56,47.11l2020.71-85.43c24.36-1,44.23-21.61,44.23-45.72V1586C2590.92,1460.19,2512.37,1405.75,2443.22,1382.39Z"
              />
            </g>
            <path
              className="cls-10"
              d="M2615,2392.12,260.17,2371.61v60.68c0,16.47,10.27,30.48,24.18,33l665.87,119.5a92,92,0,0,0,23.89,1.12L2589.4,2449.64c14.42-1.22,25.59-15.27,25.59-32.19Z"
            />
            <path
              className="cls-11"
              d="M1856.94,2293.75l-1570.85,111c-28.11,2-51-19.12-51-47.15v-1123a50.89,50.89,0,0,1,51-50.76H1856.94c23.16,0,41.88,20.54,41.88,45.88V2244.91C1898.82,2270.25,1880.1,2292.11,1856.94,2293.75Z"
            />
            <path
              className="cls-12"
              d="M1882,2293.75l-1570.85,111c-28.11,2-51-19.12-51-47.15v-1123a50.89,50.89,0,0,1,51-50.76H1882c23.16,0,41.88,20.54,41.88,45.88V2244.91C1923.87,2270.25,1905.15,2292.11,1882,2293.75Z"
            />
            <path
              className="cls-6"
              d="M1833.05,2222.18,370,2318.61c-22.88,1.5-41.47-15.82-41.47-38.7V1296.74a41.67,41.67,0,0,1,41.47-41.6l1463.08-6.06c19.11-.08,34.56,16.76,34.56,37.6v895.49C1867.61,2203,1852.16,2220.92,1833.05,2222.18Z"
            />
            <path
              className="cls-9"
              d="M1152,1214.6c0,10.43-8.08,18.92-18.07,19s-18.11-8.43-18.11-18.88,8.11-18.94,18.11-19S1152,1204.16,1152,1214.6Z"
            />
            <path
              className="cls-13"
              d="M1842.79,2288.71,260.17,2405.56,950.22,2529.4a91.6,91.6,0,0,0,23.89,1.12L2615,2392.12l-747-102.61A119.83,119.83,0,0,0,1842.79,2288.71Z"
            />
            <polygon
              className="cls-14"
              points="491.1 2408.5 1808.68 2309.77 2216.46 2365.33 910.23 2470.87 491.1 2408.5"
            />
            <path
              className="cls-15"
              d="M1503.52,1985.76c-121.1-65.16-216.32,17.4-308.21-64.06-55.72-49.39-28.36-86.21-96.92-160-75.92-81.75-125.36-54.27-201.66-127.84-96.48-93-48.23-165.39-131.34-232.18-100.82-81-209.55-6-305.52-83.73-41.4-33.52-64.11-82.24-76-134.06H290a29.81,29.81,0,0,0-29.82,29.79V2377.73A27.41,27.41,0,0,0,290,2405.41l1601-113.64c7.85-.56,14.82-5.15,19.29-11.8-117.19-4.27-189.19-43.56-235.22-84.17C1585,2116.35,1600.61,2038,1503.52,1985.76Z"
            />
            <path
              className="cls-16"
              d="M2572.27,1577.8v703.08c0,10.52-9,12.9-19.13,13.38L2213,2316.57l-5,.23c-10.32.48-18.77-7.81-18.77-18.41V1589.27c0-10.61,8.45-19.53,18.77-19.84l6.83-.2,341.53,5.7C2566.46,1574.64,2572.27,1567.28,2572.27,1577.8Z"
            />
            <path
              className="cls-17"
              d="M2583.15,1577.13v703.6c0,10.52-8.32,19.51-18.5,20l-346.35,16a18.08,18.08,0,0,1-18.8-18.43V1588.63c0-10.61,8.46-19.55,18.8-19.85l346.35-10.23C2574.83,1558.25,2583.15,1566.61,2583.15,1577.13Z"
            />
            <path
              className="cls-6"
              d="M2571.66,1616.49v651.3c0,9.81-7.77,18.2-17.26,18.63l-325.69,14.9a16.86,16.86,0,0,1-17.53-17.18V1627.6c0-9.9,7.89-18.23,17.53-18.53l325.69-9.91C2563.89,1598.87,2571.66,1606.67,2571.66,1616.49Z"
            />
            <path
              className="cls-18"
              d="M2398.58,1584.78a6.78,6.78,0,0,1-6.44,6.83,6.31,6.31,0,0,1-6.44-6.44,6.78,6.78,0,0,1,6.44-6.82A6.3,6.3,0,0,1,2398.58,1584.78Z"
            />
            <g className="cls-8">
              <path
                className="cls-9"
                d="M2470.65,1984.78c-31.57-79.39-116.69-60.64-143.2-140.87-21.65-65.49,26.49-103.87,7.65-179.69-10.58-42.55-36.6-74.16-63.2-97l-52.73,1.55a20.09,20.09,0,0,0-19.35,19.85v709c0,10.6,8.72,18.36,19.35,17.24L2484.46,2287c-21.29-33.56-29.85-64.23-32.87-89.7C2440.59,2104.64,2499.59,2057.51,2470.65,1984.78Z"
              />
            </g>
            <path
              className="cls-18"
              d="M1611.77,2005.21a152.17,152.17,0,0,1-82.8-21.41c-75.57-45.31-187.24-120.12-287.7-218-127.48-124.27-200.72-250.59-216.74-374.63l-.25-1.94-3.11-529.28c0-104.6,68.22-189.51,196.31-245.3,105.83-46.1,246.1-68.94,394.29-64.65,146.46,4.24,282,34.46,382.29,84.81,119.24,59.86,181.81,144,181.81,243.71L2173,1384.2l-.23,1.86c-14.64,118.78-82,241.56-201.14,365.71-95.53,99.59-203.49,178.51-277.63,227.4A157.61,157.61,0,0,1,1611.77,2005.21Z"
            />
            <path
              className="cls-6"
              d="M1640.83,2005.21a148.6,148.6,0,0,1-81.7-21.41c-74.58-45.31-184.76-120.12-283.9-218-125.79-124.27-198.07-250.59-213.88-374.63l-.25-1.94L1058,859.9c0-104.6,67.33-189.51,193.73-245.3,104.43-46.1,242.85-68.94,389.07-64.65,144.53,4.24,278.26,34.46,377.25,84.81,117.66,59.86,179.4,144,179.4,243.71l-2.8,505.73-.23,1.86C2180,1504.84,2113.5,1627.62,1996,1751.77c-94.27,99.59-200.8,178.51-274,227.4A154.05,154.05,0,0,1,1640.83,2005.21Z"
            />
            <path
              className="cls-19"
              d="M1093,860.28l3.09,526.61c34.66,268.68,350.43,486.22,488,568.87,39.4,23.68,89.77,22.27,128.89-3.47,134.65-88.61,433.13-311.68,465-570L2180.77,878C2180.77,503.77,1093,469.57,1093,860.28Z"
            />
            <path
              className="cls-18"
              d="M1648.64,1874.59a18.76,18.76,0,0,1-10.19-2.7c-56.63-34.29-166.4-106.11-261.89-199.91-103.15-101.33-162.64-199.84-176.28-292.36l-3-517.88c.13-49.69,39.46-92.22,116.57-126.25,86.07-38,208.31-57.92,334.82-54.92,125.25,3,243.92,28.19,326.13,69,72.72,36.08,109.49,78.62,109.61,126.59l-2.82,500c-12.73,89.53-68.57,186.05-166.6,287.51-92.18,95.4-199.86,171-256.14,207.79A19.42,19.42,0,0,1,1648.64,1874.59Z"
            />
            <path
              className="cls-2"
              d="M1635.72,1839.19c-57.19-35.22-158.88-103.23-247.6-190.55-96.94-95.4-153-186.94-166.22-271.65l-3-514.88c.09-35.53,32.75-68.12,96.82-96.48,81.54-36.11,198.37-55.13,320-52.4,120.47,2.7,234,26.5,312.06,65.11,60.63,30,91.3,62.72,91.38,97.37l-2.81,498.11c-12.37,82.19-65.29,172.07-157.81,267.66C1792.62,1730.22,1692.64,1801.58,1635.72,1839.19Z"
            />
            <path
              className="cls-6"
              d="M1840.33,1165.08l-385.08,3.42c-29.6.27-53.72,23.34-53.72,51.53v246.73c0,28,24,49.74,53.52,48.54l383.73-15.72c27.29-1.11,49.43-23.71,49.57-50.48l1.22-235.7C1889.71,1186.47,1867.72,1164.83,1840.33,1165.08Z"
            />
            <path
              className="cls-18"
              d="M1700.48,1306.56c.09-27.25-23.3-48.79-51.86-47-25.28,1.6-46.26,22-47.67,46.53a46.39,46.39,0,0,0,24.83,43.83,17.19,17.19,0,0,1,8.63,18.35l-11.13,62.33c-1.42,7.93,4.87,14.91,13.16,14.62l28.17-1c8.24-.28,14.5-7.66,13.14-15.46L1667,1367c-1.28-7.37,2.52-14.68,9.19-18.69C1690.69,1339.62,1700.43,1324.08,1700.48,1306.56Z"
            />
            <path
              className="cls-6"
              d="M1834.93,1140.6a20.54,20.54,0,0,1-20.87-20.52l.23-53.75c.24-54-44.39-98.38-100-98.93l-125.7-1.25c-57.56-.57-104.89,44.31-104.93,100l-.05,55.44c0,11.77-10,21.38-22.41,21.46s-22.49-9.43-22.48-21.25l0-55.68c0-79.59,67.81-143.5,149.93-142.35l125.75,1.74c79,1.1,142.11,64.33,141.74,140.85l-.26,53.53A21,21,0,0,1,1834.93,1140.6Z"
            />
            <path
              className="cls-20"
              d="M1035.45,1409.24a210.37,210.37,0,0,0,11.34-18c3.91-7.45-5.62-28.09-9.82-45.32s-6.37,9.64-6.9,15.73-.59,17.33-6.89,36.63Z"
            />
            <path
              className="cls-21"
              d="M987.7,2444.89l-2.88,46.19s6.55,6.94,19.17,2.11l13.78-45.36Z"
            />
            <path
              className="cls-22"
              d="M993.49,2478.85s-22.63,9.23-18.23,19.23c2.35,5.37,10.51,17.51,17.56,27.59a26.44,26.44,0,0,0,29.23,10.2c3.66-1.1,7.4-2.17,10.72-3a7.17,7.17,0,0,0,.58-13.71,53.77,53.77,0,0,0-9.24-2.5c-8.28-1.28-19.68-20.84-21-28.68S993.49,2478.85,993.49,2478.85Z"
            />
            <path
              className="cls-18"
              d="M939.11,2001.58c33.32,11.5,156.53,58.07,184,164.9,1.46,5.7,5.22,21.56,5.39,47.47.71,107.82-62,199.08-107.59,252.17l-43.13-.72c-7.18-27.52-13.77-68.68-3.45-115,15.77-70.78,56.68-89.14,48.79-123.89-14.33-63.09-160.83-53.55-174.64-110C843.48,2096.06,854.43,2061.43,939.11,2001.58Z"
            />
            <path
              className="cls-23"
              d="M527,2647.13l62.56-1.46a4.17,4.17,0,0,0,2.56-7.38,15.86,15.86,0,0,0-12.07-3.91c-11.89,1.24-38.59-15.41-50.7-11.83-4,1.16-7.17,10.47-8.82,13A7.49,7.49,0,0,0,527,2647.13Z"
            />
            <path
              className="cls-24"
              d="M555.11,2599.06l-25.76,23.49a28.66,28.66,0,0,0,22.11,3.84l26.34-18.13Z"
            />
            <g className="cls-25">
              <path
                className="cls-26"
                d="M1049.64,2279.78c17.28-46.65,38-104.17,14.34-136.83-24-33.06-76.42-5.16-129.06-31.79-19.53-9.88-39.59-27.56-56.28-59.56-29.55,30.51-33.57,51-30.18,64.87,13.81,56.49,160.31,47,174.64,110,7.89,34.75-33,53.11-48.79,123.89-8.88,39.82-5.24,75.8.51,102.61a354.68,354.68,0,0,1,25.28-77.43C1019,2334.67,1031.44,2328.93,1049.64,2279.78Z"
              />
            </g>
            <path
              className="cls-18"
              d="M958.2,1988.11a1121.73,1121.73,0,0,1-162.5,383.67,1117.5,1117.5,0,0,1-217,240.44,52.46,52.46,0,0,1-37.77-2.9,358.73,358.73,0,0,1,35.28-106.91c39.82-76.63,75.27-74.17,115.26-141.81,29.29-49.52,38.81-102.13,57.85-207.36,14.71-81.25,14.72-100.67,34.85-124C824.91,1982.17,901.35,1981.64,958.2,1988.11Z"
            />
            <g className="cls-27">
              <path
                className="cls-28"
                d="M591.51,2519.75c14.21-22.43,39.42-45.78,89.15-91.85,51.4-47.62,49.42-39,59.54-53.08,45.29-63,20.76-130.3,32-211.53,6.25-45.32,26.26-104.54,84.52-170.88-27.3,5-53.45,15.87-72.48,36.86-23.37,25.79-21.65,51-34.85,124-19,105.23-28.56,157.84-57.85,207.36-40,67.64-75.44,65.18-115.26,141.81A358.73,358.73,0,0,0,541,2609.32a52.79,52.79,0,0,0,16.23,4.74,52.26,52.26,0,0,0,14.48-.26C568.38,2560.55,584.3,2531.12,591.51,2519.75Z"
              />
            </g>
            <path
              className="cls-2"
              d="M1013,1383.07s16.66,124-114.05,211.51L1038,1627.76s44.52-83.24,12.29-221.12Z"
            />
            <path
              className="cls-29"
              d="M881.8,1501.08c6.83-13.46,9.65-13.38,11.33-20.48,3.82-16.18-6-36.73-14.42-37-5.39-.18-5.84,8.21-17.26,21.28-14,16-22.49,13.92-30.73,27.82-1.92,3.25-10.59,17.89-5.26,28.82,6.8,13.94,33.63,16.15,44.84,5.39C875.62,1521.79,873.39,1517.65,881.8,1501.08Z"
            />
            <path
              className="cls-30"
              d="M861.69,1515.59s4.79,25.57,1.38,46.36c-3.08,18.79-37.88,38.31-44.56,43.91s17.7,11.67,40,8.74,83.55-22.51,92.85-33.42-10.83-5.54-27.76-7.6-33.09-30.44-33.58-44.92S861.69,1515.59,861.69,1515.59Z"
            />
            <path
              className="cls-31"
              d="M869,1534.68s17.11,7.51,32.27-4.61c13.57-10.85-6.61-44.18-20.41-44.61-4.61-.14-11.33,3.16-15.3,8-2.34,2.86-2.48,4.75-6.4,9.34-3.62,4.23-5.21,4.61-5.76,6.66-.68,2.57.5,6.86,9.79,14.24-4.63-.86-8.62.36-10.17,3.06a6,6,0,0,0-.61,3.17C853,1534.94,859.52,1537.27,869,1534.68Z"
            />
            <path
              className="cls-32"
              d="M1245,1445.74s10.36-1.44,7.13-21.23c-2.53-15.52-.61-20.73,3-18s4.18,11.71,4.18,11.71,13.36-11.39,18.86-26.32,9-2.36,10.21,5.11-7.86,30.64-13,35-12.58,23.37-12.58,23.37Z"
            />
            <path
              className="cls-9"
              d="M1272.62,1451l-35.36-24.76c-14.35,88.17-47,122.77-74.64,137.91-66.8,36.51-126.42-28.56-254.29-2-35.23,7.32-96.65,21-130.7,71.15-9,13.19-12.14,23.18-27,117.84-19,121-19.67,142.1-17,168.15,4.9,47.68,7.87,76.57,29.85,102.15,58.38,67.9,182.45,32.89,198,28.28,28.74-8.51,73.4-21.74,91.14-59.71,8.35-17.87,7.47-34.2-5.37-99.54-25.41-129.42-28.66-137.8-21.57-152,24-47.83,99.81-20.47,163.9-64.94C1227.06,1647.58,1269.3,1590.91,1272.62,1451Z"
            />
            <path
              className="cls-33"
              d="M903.34,2032.47c12.51-25.66-4.3-49.31,14.14-80.15,23.51-39.3,65.8-26,81.72-55,27.21-49.66-79.92-118.93-58.15-198,10.4-37.75,46.69-65.08,77-75.43,67.31-23,111.33,35.6,174.43,17.28,15-4.34,32.12-13.33,49.48-32-15.34,32.37-34.4,51.93-52.38,64.41-64.09,44.47-139.95,17.11-163.9,64.94-7.09,14.17-3.84,22.55,21.57,152,12.84,65.34,13.72,81.67,5.37,99.54-17.74,38-62.4,51.2-91.14,59.71-8.51,2.52-49.55,14.12-94.52,13C887,2054.6,897.82,2043.78,903.34,2032.47Z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
