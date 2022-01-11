package com.esports.aem.core.models;


import com.esports.aem.core.dto.NavigationList;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Model(adaptables = Resource.class,defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class NavigationModel {

    @ChildResource
    private Resource navlinks;

    private List<NavigationList> navList;

    @PostConstruct
    protected void init(){
        navList = new ArrayList<>();
        if (navlinks != null){
            navlinks.listChildren().forEachRemaining(item->{
                ValueMap valueMap = item.getValueMap();
                String link = valueMap.get("hyperlink", StringUtils.EMPTY);
                String img = valueMap.get("image", StringUtils.EMPTY);
                String lntext = valueMap.get("linktext", StringUtils.EMPTY);
                String tltext = valueMap.get("tooltext", StringUtils.EMPTY);


                NavigationList navigationList = new NavigationList(link,img,lntext,tltext);

                navList.add(navigationList);
            });
        }
    }

    public List<NavigationList> getNavList() {
        return navList;
    }
}
