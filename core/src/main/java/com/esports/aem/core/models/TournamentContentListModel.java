package com.esports.aem.core.models;

import com.adobe.cq.export.json.ExporterConstants;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Getter
@Model(adaptables = SlingHttpServletRequest.class,
        resourceType = "esports/components/datasource/tournamentContentList",
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION,selector = "model")
public class TournamentContentListModel {

    @Self
    private SlingHttpServletRequest request;

    @ValueMapValue
    private String instanceType;

    @ValueMapValue
    private String gameType;

    @ValueMapValue
    private String gameName;

    @ValueMapValue
    private String time;

    @ValueMapValue
    private String date;

    @ValueMapValue
    private String logoImage;


}
