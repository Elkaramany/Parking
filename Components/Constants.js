import EStyleSheet from 'react-native-extended-stylesheet';

const Colors= {
    mainBackGround: '#fff',
    mainForeGround: "#338329",
    sideText: '#F26522',
    mainFooter: 'tomato',
    brightRed: '#a35d6a',
    mainHeader: '#3b2e5a',
}

const GlobalStyles = EStyleSheet.create({
    textInputStyle:{
        fontSize: '15rem',
        color: Colors.mainForeGround,
        height: '20rem',
        marginLeft: '5rem'
    },
    textInputContainer:{
        marginBottom: '5rem',
        width: '100%'
    },
})

export {Colors, GlobalStyles}