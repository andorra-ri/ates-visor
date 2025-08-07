create view public.routes_testing as
select
  r.code,
  min(ca.name) as name_ca,
  min(ca.description) as description_ca,
  min(ca.departure) as departure_ca,
  min(ca.arrival) as arrival_ca,
  min(es.name) as name_es,
  min(es.description) as description_es,
  min(es.departure) as departure_es,
  min(es.arrival) as arrival_es,
  min(fr.name) as name_fr,
  min(fr.description) as description_fr,
  min(fr.departure) as departure_fr,
  min(fr.arrival) as arrival_fr,
  min(en.name) as name_en,
  min(en.description) as description_en,
  min(en.departure) as departure_en,
  min(en.arrival) as arrival_en,
  min(z.name) as zone,
  r.grade,
  r.vdrop as elevation,
  r.orientation,
  r.circular,
  r.duration,
  round(
    sum(st_length (t.geometry::geography)) filter (
      where
        t.main = true
    )
  ) as distance,
  LEAST(
    r.created_at,
    min(t.created_at)::timestamp with time zone
  ) as created_at,
  GREATEST(
    r.updated_at,
    max(t.updated_at)::timestamp with time zone
  ) as updated_at,
  json_agg(t.*) as trails
from
  private.routes r
  join private.trails t on r.code::text = t.route_code::text
  join private.routes_i18n_ca ca on r.code::text = ca.route_code::text
  join private.routes_i18n_es es on r.code::text = es.route_code::text
  join private.routes_i18n_fr fr on r.code::text = fr.route_code::text
  join private.routes_i18n_en en on r.code::text = en.route_code::text
  join private.zones z on r.zone_code::text = z.code::text
group by
  r.code;
