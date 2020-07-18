// import * as React from 'react';
// import { Text, View, StyleSheet } from 'react-native';
// import { FAQ, Question } from './app/components/Question'
 
// // define some bullets
// const bullets = [
//     'you could say hello',
//     'Open an issue',
//     'making a pull request',
//     'or give me more ideas to improve this component'
// ]



// const goTo = (link) => {
//     WebBrowser.openBrowserAsync(
//         link
//     );
// }
 
// const questions = [
//     {
//         question: "How can I help you?",
//         reply: "You have several options to choose:",
//         bullets: bullets,
//         actionText: "I'm ready to help!",
//         onClick: action_example
//     },
//     {
//         question: "Don't you know how to start?",
//         reply: "Open a GitHub account and chat whit me",
//         actionText: "Sure! Take me there!",
//         onClick: () => goTo('https://github.com/'),
//     }
// ]
 
// // or any pure javascript modules available in npm
// import { Card } from 'react-native-paper';
 
// export default class faqs extends React.Component {
//     render() {
//         return (
//             <View style={styles.container}>
 
//                 <View>
//                     <Text style={{ textAlign: 'center' }}>You can load a complete F.A.Q.</Text>
 
//                     <FAQ
//                         title='F.A.Q.'
//                         questions={questions}
//                     />
 
//                 </View>
 
//                 <View>
//                     <Text style={{ textAlign: 'center' }}>Or add your questions one by one</Text>
//                     <Question
//                         question="Is it possible to add just one question?"
//                         reply="Of course, here you have an example"
//                         actionText="Sure! Take me there!"
//                         onClick={() => goTo('https://github.com/')}
//                     />
//                 </View>
 
//             </View>
//         );
//     }
// }
 
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'space-evenly',
//         paddingTop: Constants.statusBarHeight,
//         backgroundColor: '#ecf0f1',
//         padding: 8,
//     }
// });
 
 