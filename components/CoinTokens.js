import React, { useEffect, useState } from "react";
import {
	View
} from "react-native";

import StyleText from "../components/StyleText";
import { ListItem, Avatar } from "@rneui/themed";
import Config from "../config.dev";
const apiUrl = Config.API_URL;

export default function CoinTokens({ coinTokens }) {
	return (
        coinTokens.map((token, index) => {
            const symbol = `${token.id}.png`;
            return (
                <ListItem key={index} bottomDivider>
                    <Avatar
                        rounded
                        style={{ marginLeft: 10 }}
                        source={{
                            uri: `${apiUrl}/symbols/${symbol}`,
                        }}
                        avatarStyle={{
                            width: 32,
                            height: 32,
                        }} // Adjust width and height as needed
                    />
                    <ListItem.Content>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: 290,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "column",
                                }}
                            >
                                <StyleText style={{ fontSize: 16 }}>
                                    {token.name}
                                </StyleText>
                                <StyleText
                                    style={{
                                        fontSize: 13,
                                        color: "grey",
                                    }}
                                >
                                    {token.symbol}
                                </StyleText>
                            </View>
                            <View
                                style={{
                                    flexDirection: "column",
                                }}
                            >
                                <StyleText
                                    style={{
                                        fontSize: 16,
                                        textAlign: "right",
                                    }}
                                >
                                    ${parseFloat(token.priceUsd).toFixed(2)}{" "}
                                </StyleText>
                                <StyleText
                                    style={{
                                        fontSize: 13,
                                        textAlign: "right",
                                        marginRight: 4,
                                    }}
                                >
                                    <StyleText
                                        style={{
                                            color:
                                                token.changePercent24Hr > 0
                                                    ? "#71B280"
                                                    : "lightcoral",
                                        }}
                                    >
                                        {token.change24HrStr}
                                    </StyleText>
                                </StyleText>
                            </View>
                        </View>
                    </ListItem.Content>
                </ListItem>
            );
        })
    )
}
