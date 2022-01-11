package com.esports.aem.core.dto;

public class NavigationList {

    private String hyperLink;
    private String navImage;
    private String linkText;
    private String toolText;


    public NavigationList(String hyperLink, String navImage, String linkText, String toolText) {
        this.hyperLink = hyperLink;
        this.navImage = navImage;
        this.linkText = linkText;
        this.toolText = toolText;
    }

    public String getHyperLink() {
        return hyperLink;
    }

    public String getNavImage() {
        return navImage;
    }

    public String getLinkText() {
        return linkText;
    }

    public String getToolText() {
        return toolText;
    }
}
