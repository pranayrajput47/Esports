package com.esports.aem.core.models;


import com.esports.aem.core.dto.NavigationList;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;


@Model(adaptables = {Resource.class, SlingHttpServletRequest.class},defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class NavigationModel {



    Logger log = LoggerFactory.getLogger(NavigationModel.class);

    @ChildResource
    private Resource navlinks;

    private List<NavigationList> navList;

   @PostConstruct
    protected void init(){
        log.info("Model has been called");
        navList = new ArrayList<>();
        if (navlinks != null){
            log.info("My name is jatin bhardwaj");
            navlinks.listChildren().forEachRemaining(item->{
                ValueMap valueMap = item.getValueMap();
                String link = valueMap.get("hyperlink", StringUtils.EMPTY);
                String img = valueMap.get("image", StringUtils.EMPTY);
                String lntext = valueMap.get("linktext", StringUtils.EMPTY);
                String tltext = valueMap.get("tooltext", StringUtils.EMPTY);
                String alttext = valueMap.get("altText", StringUtils.EMPTY);

                log.info("link,img,lntext,tltext,alttext : {}{}{}{}{}",link,img,lntext,tltext,alttext);


                NavigationList navigationList = new NavigationList(link,img,lntext,tltext,alttext);

                navList.add(navigationList);
            });
        }
    }

    public List<NavigationList> getNavList() {
        return navList;
    }
}
