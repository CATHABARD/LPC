export class Saison
{
  constructor(
    public id: string = "",
    public md5: string = "",
    public year: number = 0,
    public current: boolean = false) {}
}

export class Epreuve
{
    constructor(
    public id: string = "",
    country_iso: string = "",
    country_name: string = "",
    country_region_iso: string = "",
    event_circuit_information_url: string = "",
    event_circuit_information_menu_position: number = 0,
    event_podiums_url: string = "",
    event_podiums_menu_position: number = 0,
    event_pole_positions_url: string = "",
    event_pole_positions_menu_position: number = 0,
    event_nations_statistics_url: string = "",
    event_nations_statistics_menu_position: number = 0,
    event_riders_all_time_url: string = "",
    event_riders_all_time_menu_position: number = 0,
    circuit_id: string = "",
    circuit_name: string = "",
    circuit_legacy_id: number = 0,
    circuit_place: string = "",
    circuit_nation: string = "",
    test: number = 0,
    sponsored_name: string = "",
    public date_end: string = "",
    toad_api_uuid: string = "",
    public date_start: string = "",
    name: string = "",
    season_id: string = "",
    year: number = 0,
    season_current: number = 0,
    short_name: string = "")
    {}
}

export class EpreuveFutures
{
    constructor(
        season: number = 0,
        public calendar: [
        {
            id: number,
            shortname: string,
            name:  string,
            hashtag: string,
            circuit: string,
            country_code: string,
            country: string,
            start_date: string,
            end_date: string,
            local_tz_offset: number,
            tes: number,
            has_timing: number,
            friendly_name: string,
            dates: string,
            key_session_times: [
            {
                session_shortname: String,
                session_name: string,
                start_datetime_utc: string
            }
            ],
            last_session_end_time: string
        }])
    {}
}

export class Categorie{
    constructor(
        public id: string = "",
        legacy_id: number = 0,
        public name: string = "",
        year: number = 0,
        md5: string ="") 
    {}
}

export class Session{
    constructor(

    ) {}
}

export class Sprint{
    constructor(
        id: string = "",
        date: string = "",
        number: number = 0,
        track_condition: string = "",
        air_condition: string = "",
        humidity_condition: string = "",
        ground_condition: string = "",
        eather_condition: string = "",
        circuit_name: string = "",
        classification_url: string = "",
        classification_menu_position: string = "",
        analysis_url: string = "",
        analysis_menu_position: number = 0,
        average_speed_url: string = "",
        average_speed_menu_position: number = 0,
        fast_lap_sequence_url: string = "",
        fast_lap_sequence_menu_position: number = 0,
        lap_chart_url: string = "",
        lap_chart_menu_position: number = 0,
        analysis_by_lap_url: string = "",
        analysis_by_lap_menu_position: number = 0,
        fast_lap_rider_url: string = "",
        fast_lap_rider_menu_position: number = 0,
        grid_url: string = "",
        grid_menu_position: number = 0,
        session_url: string = "",
        session_menu_position: number = 0,
        world_standing_url: string = "",
        world_standing_menu_position: number = 0,
        best_partial_time_url: string = "",
        best_partial_time_menu_position: number = 0,
        maximum_speed_url: string = "",
        maximum_speed_menu_position: number = 0,
        combined_practice_url: string = "",
        combined_practice_menu_position: number = 0,
        combined_classification_url: string = "",
        combined_classification_menu_position: number = 0,
        type: string = "",
        category_id: string = "",
        category_legacy_id: number = 0,
        category_name: string = "",
        event_id: string = "",
        event_name: string = "",
        event_sponsored_name: string = "",
        year: string = "",
        circuit_id: string = "",
        circuit_legacy_id: number = 0,
        circuit_place: string = "",
        circuit_nation: string = "",
        country_iso: string = "",
        country_name: string = "",
        country_region_iso: string = "",
        event_short_name: string = "",
        status: string = "")
    {}
}

export class Resultatat{
    constructor(
        result_id: string = "",
        position: number = 0,
        rider_id: string = "",
        public rider_full_name: string = "",
        public rider_country_iso: string = "",
        rider_country_name: string = "",
        rider_region_iso: string = "",
        rider_legacy_id: number = 0,
        rider_number: number = 0,
        riders_api_uuid: string = "",
        team_id: string = "",
        public team_name: string = "",
        team_legacy_id: number = 0,
        team_season_id: string = "",
        team_season_year: number = 0,
        team_season_current: number = 0,
        constructor_id: string = "",
        constructor_name: string = "",
        constructor_legacy_id: number = 0,
        average_speed: number = 0,
        gap_first: string = "",
        gap_prev: number = 0,
        gap_lap: number = 0,
        total_laps: number = 0,
        top_speed: number = 0,
        time: string = "",
        points: number = 0,
        status: string = "",
        best_lap_number: number = 0,
        best_lap_time: number = 0,
        record_speed: number = 0,
        record_year: number = 0,
        isNewRecord: number = 0,
        file: string = "",
        files: string = "",
        session_id: string = "",
        event_id: string = "",
        year: string = "",
        md5: string = "",
        track_condition: string = "",
        air_condition: string = "",
        humidity_condition: number = 0,
        ground_condition: string = "",
        weather_condition: string = "",
        public category_id: string = "",
        session_number: number = 0,
        circuit_name: string = "",
        session_type: string = "",
        category_name: string = "",
        event_name: string = "",
        event_sponsored_name: string = "",
        event_season: string = "",
        circuit_id: string = "",
        circuit_legacy_id: string = "",
        circuit_place: string = "",
        circuit_nation: string = "",
        circuit_country_iso: string = "",
        circuit_country_name: string = "",
        circuit_country_region_iso: string = "",
        event_short_name: string = "",
        team_color: string = "",
        text_color: string = "",
        public picture_url: string = "",
        sponsored_team: string = "",
        rider_team_id: string = "",
        public rider_name: string = "",
        public rider_surname: string = "",
        rider_nickname: number = 0,
        current_career_step_season: string = "",
        rider_in_grid: number = 0,
        profile_picture_url: string = "",
        public bike_picture_url: string = "",
        helmet_picture_url: string = "",
        number_picture_url: string = "",
        public portrait_picture_url: string = "",
        rider_type: string = "",
        country_flag_url: string = "",
        birth_city: string = "",
        birth_date: string = "",
        years_old: number = 0,
        published: number = 0)
    {}
}

export class Pilote {
    constructor(
        classification_id: string = "",
        public constructor_name: string = "",
        md5: string = "",
        public points: number = 0,
        public position: number = 0,
        rider_country_iso: string = "",
        public rider_full_name: string = "",
        team_color: string = "",
        text_color: string = "",
        year: string = "",
        public categoryid: string = "")
    {}
}
