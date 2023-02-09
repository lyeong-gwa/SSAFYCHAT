package com.ssafychat.global.util;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.text.SimpleDateFormat;
import java.util.Date;

@Converter
@Slf4j
public class DateToStringConverter implements AttributeConverter<String, Date> {

    private static final Logger LOGGER = LoggerFactory.getLogger(DateToStringConverter.class);
    private SimpleDateFormat simpleFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");

    /*String to Date (Client -> DB */
    @Override
    public Date convertToDatabaseColumn(String attribute) {
        Date date = null;
        try {
            date = simpleFormat.parse(attribute);
        } catch (Exception e) {
            LOGGER.error("[ERROR] 문자열을 Date 타입으로 변환하는데 실패하였습니다.", e);
        }
        return date;
    }
    /*Date to String (DB -> Client*/
    @Override
    public String convertToEntityAttribute(Date dbData) {
        if(dbData != null) {
            return simpleFormat.format(dbData);
        } else {
            return null;
        }
    }
}