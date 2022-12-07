// import { Stack } from '@react-native-material/core';
// import * as React from 'react';
// import { StyleSheet, View } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// export interface SelectComponentProps extends TextSelectProps {
//     itens: {label: string, value: any}[];
//     setItem: React.Dispatch<React.SetStateAction<any>>;
// }
// const SelectComponent: React.FC<SelectComponentProps> = (props) => {
//     const [temFoco, setTemFoco] = React.useState(false);

//     const estaEmFoco = () => {
//         setTemFoco(true);
//         props.setTemErro ? props.setTemErro(false) : null;
//     }

//     const styles = StyleSheet.create({
//         stack: {
//             marginBottom: 10,
//         },
//         view: {
//             flexDirection: 'row',
//             justifyContent: 'center',
//             alignItems: 'center',
//         },
//         input: {
//             flex: 6,
//             height: 50,
//             borderWidth: 1,
//             padding: 10,
//             fontSize: 15,
//             width: "100%",
//             borderTopWidth: 0,
//             borderLeftWidth: 0,
//             borderRightWidth: 0,
//             borderBottomColor: props.temErro ? "red" : temFoco ? "blue" : "black",
//             color: props.temErro ? "red" : temFoco ? "blue" : "black",
//         },
//         text: {
//             borderColor: 'red',
//             borderRadius: 8,
//             padding: 0,
//             color: 'red'
//         },

//         icon: {
//             flex: 1,
//             height: 50,
//             borderWidth: 1,
//             borderTopWidth: 0,
//             borderLeftWidth: 0,
//             borderRightWidth: 0,
//             paddingTop: 10,
//             borderBottomColor: props.temErro ? "red" : temFoco ? "blue" : "black",
//         },
//     });

//     return (
//         <Stack spacing={1} style={styles.stack}>
//             <View style={styles.view}>
//                 {/* <Picker
//                     style={{ height: 50, width: 150 }}
//                     onValueChange={(item) => setItemSelecionado(item)}
//                 >
//                     <Picker.Item label="Java" value="java" />
//                     <Picker.Item label="JavaScript" value="js" />
//                 </Picker> */}
//             </View>
//         </Stack>
//     )
// }

// export default SelectComponent;