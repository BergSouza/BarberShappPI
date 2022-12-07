import { Picker } from "@react-native-picker/picker";

import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface SelectComponentProps {
    items: { label: string, value: string }[];
    item: string;
    setItem: React.Dispatch<React.SetStateAction<string>>;
}
const SelectComponent: React.FC<SelectComponentProps> = (props) => {
    const [temFoco, setTemFoco] = React.useState(false);

    const styles = StyleSheet.create({
        view: {
            borderBottomWidth: 1,
            flex: 1,
            borderBottomColor: temFoco ? "blue" : "black",
            marginLeft: -8,
            backgroundColor: "black",
        },
        select: {
            height: 50,
            width: "100%",
            color: "white",

        }
    });

    return (
        <View style={styles.view}>
            <Picker
                selectedValue={props.item}
                style={styles.select}
                mode={"dialog"}
                dropdownIconColor="white"
                onValueChange={(itemValue) => props.setItem(itemValue)}
                onFocus={() => setTemFoco(true)}
                onBlur={() => setTemFoco(false)}

            >
                {props.items.map((i, j) => {
                    return (<Picker.Item label={i.label} value={i.value} key={i.label+"-"+j} />)
                })}

            </Picker>
        </View>
    )
}

export default SelectComponent;