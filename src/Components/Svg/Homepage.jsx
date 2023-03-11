import React, { Fragment } from 'react'

export const LinesStep = ({ classData }) => {
    return (
        <Fragment>
            <svg
                className={classData}
                viewBox="0 0 1511 1621"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M-90 4H1038.46C1149.78 4 1240.02 94.24 1240.02 205.56C1240.02 316.88 1149.78 407.12 1038.46 407.12H473.03C361.71 407.12 271.47 497.36 271.47 608.68C271.47 720 361.71 810.24 473.03 810.24H1038.46C1149.78 810.24 1240.02 900.48 1240.02 1011.8C1240.02 1123.12 1149.78 1213.36 1038.46 1213.36H473.03C361.71 1213.36 271.47 1303.6 271.47 1414.92C271.47 1526.24 361.71 1616.48 473.03 1616.48H1601.49"
                    stroke="url(#paint0_linear_26_5)"
                    strokeOpacity={0.31}
                    strokeWidth={8}
                    strokeMiterlimit={10}
                    strokeDasharray="26 26"
                />
                <defs>
                    <linearGradient
                        id="paint0_linear_26_5"
                        x1={633.5}
                        y1={1158.5}
                        x2={755.745}
                        y2={1616.48}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#2C4C81" />
                        <stop offset={1} stopColor="#09101B" stopOpacity={0} />
                    </linearGradient>
                </defs>
            </svg>
        </Fragment>
    )
}