create view public.waypoints_testing as
with
  main_trails as (
    select
      trails.route_code,
      trails.down,
      st_linemerge ((st_dump (st_union (trails.geometry))).geom) as geometry
    from
      private.trails
    where
      trails.main = true
    group by
      trails.id,
      trails.route_code
  )
select
  t.route_code,
  wp.id,
  wp.kind,
  wp.geometry,
  wp.created_at,
  wp.updated_at,
  ca.name as name_ca,
  ca.description as description_ca,
  es.name as name_es,
  es.description as description_es,
  fr.name as name_fr,
  fr.description as description_fr,
  en.name as name_en,
  en.description as description_en,
  st_linelocatepoint (t.geometry, wp.geometry) + case
    when t.down then 1
    else 0
  end::double precision as "order"
from
  main_trails t
  join private.waypoints wp on case
    when wp.kind = 'ALERT'::wp_kind then st_dwithin (
      t.geometry::geography,
      wp.geometry::geography,
      0.5::double precision,
      false
    )
    else st_dwithin (
      t.geometry::geography,
      wp.geometry::geography,
      0.1::double precision,
      false
    )
  end
  join private.waypoints_i18n_ca ca on ca.id = wp.id
  join private.waypoints_i18n_es es on es.id = wp.id
  join private.waypoints_i18n_fr fr on fr.id = wp.id
  join private.waypoints_i18n_en en on en.id = wp.id
order by
  t.route_code,
  (st_linelocatepoint (t.geometry, wp.geometry));
