const BlueSoccerJerseyIcon = ({ playerNumber }) => {
    return (
        <svg width="38" height="39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.2417 3.91162C16.7933 3.91162 14.6167 3.16943 14.6167 3.16943V3.31787C14.6167 4.57765 15.104 5.78583 15.9713 6.67663C16.8387 7.56743 18.0151 8.06787 19.2417 8.06787C20.4683 8.06787 21.6447 7.56743 22.5121 6.67663C23.3794 5.78583 23.8667 4.57765 23.8667 3.31787V3.16943C23.8667 3.16943 21.6901 3.91162 19.2417 3.91162Z" fill="#317EF4" />
            <path d="M26.1792 4.06006C25.7825 7.60475 22.7979 10.3687 19.2417 10.3687C15.6855 10.3687 12.7009 7.60475 12.3042 4.06006L1.89795 7.771L3.19873 16.2319L7.65824 16.7826C8.16988 16.8494 8.17133 16.8494 8.17133 17.3905L7.6792 36.4194H30.8042L30.3121 17.3905C30.2969 16.871 30.2969 16.871 30.8252 16.7826L35.2847 16.2319L36.5854 7.771L26.1792 4.06006Z" fill="#317EF4" />

            {/* Número de la camiseta */}
            <text x={playerNumber < 10 ? '15' : playerNumber < 19 ? '13' : '11.5'} y="25" fill="white" fontSize="13" fontWeight="semibold">{playerNumber}</text>
        </svg>
    )
}
export default BlueSoccerJerseyIcon;